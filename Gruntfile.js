module.exports = function (grunt) {
  
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    dead_code: true
                }
            },
            dev: {
                files: {
                    'build/jquery.modalHome.min.js': ['js/jquery.modalHome.js']
                }
            },
            dist: {
                files: {
                    'C:/codex/JHM-SiteExecutive/www/lib/js/jquery.modalHome.min.js': ['js/jquery.modalHome.js']
                }
            }
        },
        qunit: {
            files: ['tests.html']
        },
        jshint: {
            files: ['js/jquery.modalHome.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('dist', ['uglify:dist']);
    grunt.registerTask('default', ['jshint', 'qunit', 'uglify:dev']);
};
