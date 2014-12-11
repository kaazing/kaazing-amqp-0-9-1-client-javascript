module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        clean : {
            dist : {
                src : [ 'dist/' ]
            },
        },

        yuidoc2md : {
            jsdoc : {
                src : "src/amqp/*.js",
                expand : true,
                rename : function(dest, src) {
                    var path = require("path");
                    var basename = path.basename(src), 
                    newFileName = basename.replace(".js", ".md"), 
                    dirname = path.dirname(src);
                    return path.resolve(dirname, "../../dist/jsdoc", newFileName);
                }
            }
        },

        concat : {
            amqp : {
                src : [
                    // kaazing-client-javascript-util files
                    'bower_components/kaazing-client-javascript-util/KaazingNamespace.js',
                    'bower_components/kaazing-client-javascript-util/Logger.js',
                    'bower_components/kaazing-client-javascript-util/Utils.js',
                    'bower_components/kaazing-client-javascript-util/Browser.js',
                    'bower_components/kaazing-client-javascript-util/ByteOrder.js',
                    'bower_components/kaazing-client-javascript-util/ByteBuffer.js',
                    'bower_components/kaazing-client-javascript-util/Charset.js',
                    'bower_components/kaazing-client-javascript-util/URI.js',

                    // Amqp-0-9-1 files
                    'src/amqp/internal/AmqpClientVariables.js',
                    'src/amqp/internal/AmqpNamespace.js',
                    'src/amqp/internal/AmqpRequireJSModule.js',
                    'src/amqp/EventDispatcher.js',
                    'src/amqp/internal/AmqpClientStartClosure.js',
                    'src/amqp/internal/StateMachine.js',
                    'src/amqp/internal/AsyncClient.js',
                    'src/amqp/internal/AmqpConstants.js',
                    'src/amqp/internal/AmqpDomains.js',
                    'src/amqp/internal/AmqpMethods.js',
                    'src/amqp/internal/AmqpInternalFields.js',
                    'src/amqp/internal/AmqpBuffer.js',
                    'src/amqp/AmqpClient.js',
                    'src/amqp/AmqpChannel.js',
                    'src/amqp/internal/ActionList.js',
                    'src/amqp/internal/AmqpClientEndClosure.js',
                    'src/amqp/AmqpArguments.js',
                    'src/amqp/AmqpProperties.js',
                    'src/amqp/AmqpEvent.js',
                    'src/amqp/AmqpClientFactory.js', ],
                dest : 'dist/javascript/Amqp-0-9-1-debug.js'
            },
        },

        uglify: {
            amqpMin: {
                files: {
                    // Generating Amqp-0-9-1-min.js
                    'dist/javascript/Amqp-0-9-1.js': ['dist/javascript/Amqp-0-9-1-debug.js']
                },
            },
        },

        copy : {

            client_js: {
                cwd: 'bower_components/kaazing-client-javascript/js',
                src: '**',
                dest: 'dist/javascript/',
                expand: true,
            },

            demo : {
                cwd : 'demo',
                src : '**',
                dest : 'dist/javascript/',
                expand : true,
            },
        },

        karma : {
            test : {
                configFile : 'test/karma.config.js'
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-yuidoc2md');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'clean', 'yuidoc2md', 'concat', 'uglify', 'copy' ]);

    grunt.registerTask('test', [ 'karma' ]);

};
