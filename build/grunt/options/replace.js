module.exports = function(grunt) {

    var errorsTable = grunt.file.read("../doc/JSDoc/HasPlayerErrors.html");
    var regex = /<BODY[^>]*>([\w|\W]*)<\/BODY>/g;
    errorsTable = regex.exec(errorsTable)[1];

    return {

    infos: {
        options: {
            patterns: [
            {
                match: 'REVISION',
                replacement: '<%= meta.revision %>'
            },
            {
                match: 'TIMESTAMP',
                replacement: '<%= (new Date().getDate())+"."+(new Date().getMonth()+1)+"."+(new Date().getFullYear())+"_"+(new Date().getHours())+":"+(new Date().getMinutes())+":"+(new Date().getSeconds()) %>'
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/hasplayer.js', '<%= path %>/hasplayer.min.js'], dest: '<%= path %>'}
        ]
    },

    dashifInfos: {
        options: {
            patterns: [
            {
                match: 'REVISION',
                replacement: '<%= meta.revision %>'
            },
            {
                match: 'TIMESTAMP',
                replacement: '<%= (new Date().getDate())+"."+(new Date().getMonth()+1)+"."+(new Date().getFullYear())+"_"+(new Date().getHours())+":"+(new Date().getMinutes())+":"+(new Date().getSeconds()) %>'
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/dashif.js', '<%= path %>/player.js'], dest: '<%= path %>'}
        ]
    },

    orangeHasplayerInfos: {
        options: {
            patterns: [
            {
                match: 'REVISION',
                replacement: '<%= meta.revision %>'
            },
            {
                match: 'TIMESTAMP',
                replacement: '<%= (new Date().getDate())+"."+(new Date().getMonth()+1)+"."+(new Date().getFullYear())+"_"+(new Date().getHours())+":"+(new Date().getMinutes())+":"+(new Date().getSeconds()) %>'
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/orangeHasplayer.js'], dest: '<%= path %>'}
        ]
    },

    sourceForBuild: {
        options: {
            patterns: [
            {
                match: /"[ \S]*\/Context.js"/,
                replacement: '"../<%= preprocesspath %>/Context.js"'
            },
            {
                match: /"[ \S]*\/Stream.js"/,
                replacement: '"../<%= preprocesspath %>/Stream.js"'
            },
            {
                match: /"[ \S]*\/MssParser.js"/,
                replacement: '"../<%= preprocesspath %>/MssParser.js"'
            },
            {
                match: /<!-- source -->/,
                replacement: '<!-- build:js hasplayer.js -->'
            },
            {
                match: /<!-- \/source -->/,
                replacement: '<!-- endbuild -->'
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= preprocesspath %>/playerSrc.html'], dest: '<%= path %>/source/'}
        ]
    },

    sourceByBuild: {
        options: {
            patterns: [
            {
                match: /<!-- source -->([\s\S]*?)<!-- \/source -->/,
                replacement: '<script src="hasplayer.js"></script>'
            },
            {
                match: /<!-- metricsagent -->([\s\S]*?)<!-- \/metricsagent -->/,
                replacement: '<script src="metricsagent.js"></script>'
            },
            {
                match: /<!-- adsplayer -->([\s\S]*?)<!-- \/adsplayer -->/,
                replacement: ''
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/player.html'], dest: '<%= path %>'},
            {expand: true, flatten: true, src: ['<%= path %>/dashif.html'], dest: '<%= path %>'}
        ]
    },

    sourceByBuildOrangeHasPlayer: {
        options: {
            patterns: [
            {
                match: /<!-- source -->([\s\S]*?)<!-- \/source -->/,
                replacement: '<script src="hasplayer.js"></script>'
            },
            {
                match: /<!-- metricsagent -->([\s\S]*?)<!-- \/metricsagent -->/,
                replacement: '<script src="metricsagent.js"></script>'
            },
            {
                match: /<!-- adsplayer -->([\s\S]*?)<!-- \/adsplayer -->/,
                replacement: ''
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/index.html'], dest: '<%= path %>'}
        ]
    },

    orangeHasPlayerConfigPath: {
        options: {
            patterns: [
            {
                match: /loadHasPlayerConfig\("json\/hasplayer_config.json"\);/,
                replacement: 'loadHasPlayerConfig("hasplayer_config.json");'
            }, {
                match: /reqMA.open\("GET", ".\/json\/metricsagent_config.json", true\);/,
                replacement: 'reqMA.open("GET", "metricsagent_config.json", true);'
            }
            ]
        },
        files: [
            {expand: true, flatten: true, src: ['<%= path %>/orangeHasplayer.js', '<%= path %>/orangeHasPlayerApp.js'], dest: '<%= path %>'}
        ]
    },

    copyright: {
        options: {
            patterns: [
            {
                match: /\/\/COPYRIGHT/g,
                replacement: '<%= grunt.file.read("../LICENSE") %>\n\n'
            }
            ]
        },
        files: [
        {expand: true, flatten: true, src: ['<%= path %>/hasplayer.js'], dest: '<%= path %>'}
        ]
    },

    dashifNoCopyright: {
        options: {
            patterns: [
            {
                match: /\/\/COPYRIGHT/g,
                replacement: ''
            }
            ]
        },
        files: [
        {expand: true, flatten: true, src: ['<%= path %>/dashif.js', '<%= path %>/player.js'], dest: '<%= path %>'}
        ]
    },

    orangeHasplayerNoCopyright: {
        options: {
            patterns: [
            {
                match: /\/\/COPYRIGHT/g,
                replacement: ''
            }
            ]
        },
        files: [
        {expand: true, flatten: true, src: ['<%= path %>/orangeHasplayer.js'], dest: '<%= path %>'}
        ]
    },

    chromecastId:{
        options:{
            patterns: [
                {
                    match: /7E99FD26/g,
                    replacement: '9ECD1B68'
                }
            ]
        },
        files:[
        {expand: true, src:['<%= path %>/dashif.js']}
        ]
    },

    docErrorsTable: {
        options: {
            patterns: [
            {
                match: /<!-- ERRORS_TABLE -->/,
                replacement: errorsTable
            }
            ]
        },
        files: [
        {expand: true, src: ['<%= path %>/doc/JSDoc/OrangeHasPlayer/index.html']}
        ]
    }
}
};
