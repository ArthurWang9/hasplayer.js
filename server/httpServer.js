var express = require('express');
var phantom = require('phantom');
var bodyParser = require('body-parser');
var csv = require('express-csv');

var app = express();

// var port =  process.env.PORT || 3000;

// set path to the parent folder 
var dirname = __dirname.replace('server','');

app.set('views', __dirname + '/export-pdf');
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(app.router);

app.use(express.static(dirname));
app.listen(process.env.PORT || 8080);

//tableau de données d'export pdf
var database = {};

app.get('/pdf', function(req, res) {

	var metrics = JSON.parse(JSON.stringify(database[req.query.id]));

	if(req.query.showBandwidth !== 'true') {
		metrics.calcBandwidthSeries = [];
	}

	var data = JSON.stringify(metrics);
	res.render('pdf', {bandwidth: data} );
});

app.get('/export-csv', function(req, res) {

	res.setHeader('Content-disposition', 'attachment; filename=sample.csv');


	//Adding provenance for PlaySeries & Wanem & Bandwidth
	var i = 0,
	csvData = null;
	playSeriesName = 'Player',
	playSeries = JSON.parse(JSON.stringify(database[req.query.id].requestSeries));
	playSeriesLength = playSeries.length,
	y = 0,
	wanemSeriesName = 'Wanem',
	wanemSeries = JSON.parse(JSON.stringify(database[req.query.id].dataSequence));
	wanemSeriesLength = wanemSeries.length,
	z = 0,
	calcBandwidthSeriesName = 'Bandwidth',
	calcBandwidthSeries = JSON.parse(JSON.stringify(database[req.query.id].calcBandwidthSeries));
	calcBandwidthSeriesLength = calcBandwidthSeries.length;

	for(i; i < playSeriesLength; i++) {
		playSeries[i].unshift(playSeriesName);
	}

	for(y; y < wanemSeriesLength; y++) {
		wanemSeries[y].unshift(wanemSeriesName);
	}

	for(z; z< calcBandwidthSeriesLength; z++) {
		calcBandwidthSeries[z].unshift(calcBandwidthSeriesName);
		calcBandwidthSeries[z][1] = calcBandwidthSeries[z][1] + 0.001;
	}

	if(req.query.showBandwidth === 'true') {
		csvData = playSeries.concat(wanemSeries, calcBandwidthSeries);
	} else {
		csvData = playSeries.concat(wanemSeries);
	}
	
	//Sorting all arrays of datas
	csvData.sort(function(a, b){
		console.log(a);
		return a[1]-b[1];
	});

	res.csv(csvData);
});

app.get('/export-pdf', function(req, res) {
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.setViewportSize(1680, 1050);
			page.setZoomFactor(5);

			var url = 'http://localhost:8080/pdf?id='+req.query.id+'&showBandwidth='+req.query.showBandwidth;

			function doRender() {
				page.render('export-pdf/result.pdf');
				console.log('Export PDF effectué');

				setTimeout(function(){
					res.sendfile("export-pdf/result.pdf");
				}, 500);

				ph.exit();
			}
			
			page.open(url, function (status) {
				setTimeout(doRender, 1000);
			});

		});
	});
});

app.post('/chart-db', function(req, res){

	//reinit du tableau de données
	database  = {};

	//ajout d'un index dans le tableau de données d'export pdf
	var id = new Date().getTime();
	database[id] = req.body;

	res.json({"id": id});
});