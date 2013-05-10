module.exports = function (grunt) {
  
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - version:<%= pkg.version %> - <%= pkg.author %> <%= pkg.website %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
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
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - version:<%= pkg.version %> - <%= pkg.author %> <%= pkg.website %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dev: {
                files: {
                    'build/modalHome.min.css': ['css/modalHome.css']
                }
            },
            dist: {
                files: {
                    'C:/codex/JHM-SiteExecutive/www/lib/css/modalHome.min.css': ['css/modalHome.css']
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('dist', ['uglify:dist', 'cssmin:dist']);
    grunt.registerTask('default', ['jshint', 'qunit', 'uglify:dev', 'cssmin:dev']);
};