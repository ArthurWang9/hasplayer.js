angular.module('HAS', ['ngRoute']);

angular.module('HAS').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'views/home.html', controller: 'homeCtrl'});
}]);