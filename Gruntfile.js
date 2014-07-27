module.exports = function(grunt) {
  "use strict";

  var appDir = '';

  // Project configuration.
  grunt.initConfig({
    //pkg: '<json:package.json>',
    pkg: grunt.file.readJSON('package.json'),
    // Project metadata, used by some directives, helpers and tasks.
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    clean: {
      dev: [
        'js/dev/**/*.map'
      ],
      prod: [
        'css/prod',
        'js/prod',
        'js/**/*.map'
      ],
      img: [
        'img'
      ]
    },
    compass: {
      dev: {
        options: {
          sassDir: appDir + 'dev/sass',
          cssDir: appDir + 'css/dev',
          imagesDir: appDir + 'img',
          javascriptDir: appDir + 'js',
          fontsDir: appDir + 'fonts',
          relativeAssets: true,
          environment: 'development',
          outputStyle: 'expanded',
          noLineComments: false,
          force: false,
          debugInfo: true
        }
      },
      prod: {
        options: {
          sassDir: appDir + 'dev/sass',
          cssDir: appDir + 'css/prod',
          imagesDir: appDir + 'img',
          javascriptDir: appDir + 'js',
          fontsDir: appDir + 'fonts',
          relativeAssets: true,
          environment: 'production',
          outputStyle: 'compressed',
          noLineComments: true,
          force: true,
          debugInfo: false
        }
      }
    },
    coffee: {
      options: {
        bare: true
      },
      all: {
        expand: true,
        cwd: 'dev/coffee/',
        src: [
          '**/*.coffee',
          '!**/_nu/**/*.coffee'
        ],
        dest: 'js/dev/',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        },
        options: {
          sourceMap: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: 'js/dev/.jshintrc'
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [ 'Gruntfile.js' ]
      },
      main: {
        src: [
          'js/dev/main.js',
          'js/dev/app.js',
          'js/dev/config.js'
        ]
      },
      modules: {
        src: [
          'js/dev/module/accessifyhtml5.js',
          'js/dev/module/fancybox.js',
          'js/dev/module/gatrackevent.js',
          'js/dev/module/iccore.js',
          'js/dev/module/loader.js',
          'js/dev/module/responsive.js',
          'js/dev/module/teaser.js',
          'js/dev/module/totop.js',
          'js/dev/module/typo3.default.js',
          'js/dev/module/yaml-focusfix.js',
          'js/dev/module/formular/*.js',
          'js/dev/module/nav/*.js'
        ]
      },
      plugins: {
        options: {
          jshintrc: 'js/dev/plugin/.jshintrc'
        },
        src: [
          // only lint own plugin files
          'js/dev/plugin/jquery.michschbgslider.js',
          'js/dev/plugin/jquery.vtgallery.js'
        ]
      },
      inline: {
        src: [
          'js/dev/inline/*.js'
        ]
      },
      test: {
        //options: {
        //  jshintrc: 'dev/test/.jshintrc'
        //},
        src: [ 'test/**/*.js' ]
      }
    },
    qunit: {
      all: [ appDir + 'js/test/**/*.html' ]
    },
    requirejs: {
      project: {
        options: {
          appDir: 'js/dev',
          baseUrl: '.',
          dir: 'js/prod',
          mainConfigFile: 'js/dev/main.js',
          useStrict: true,
          optimize: 'uglify2',
          //generateSourceMaps: true,
          //preserveLicenseComments: false,
          //useSourceUrl: true,
          preserveLicenseComments: false,
          fileExclusionRegExp: /(^\.)|(^coffee)|(^old)|(^_nu)|(^main\.js)|(\.map$)|(inline)|(module\/Hyphenator.*)/,
          removeCombined: true,
          paths : {
            // additional paths for build script
            "almond" : "vendor/almond",
            "configuration" : "main",
            "jquery.nc" : "main",
            "requireLib" : "vendor/require",

            // main paths from main.js
            "domReady": "module/requirejs-domready",
            "jquery": "vendor/jquery-1.11.1",
            "jquery-migrate": "vendor/jquery-migrate-1.1.1",
            "antispammail": "module/antispammail",
            "hyphenator": "module/hyphenator",
            "matchmedia": "module/matchmedia",
            "picturefill": "module/picturefill",
            "prettify": "module/prettify"
          },
          modules: [
            {
              name: "main",
              exclude: [
                "jquery"
              ],
              include: [ 'almond' ],
              override: {
                optimize: "none"
              }
            }
          ]
        }
      }
    },
    concat: {
      options : {
        banner: '<%= meta.banner %>'
      },
      dev: {
        files: {
          'js/dev/plugins.js' : [ appDir + 'js/dev/plugin/*.js' ],
          'js/dev/modules.js' : [ appDir + 'js/dev/module/*.js' ]
        }
      },
      prod: {
        files: {
          'js/prod/main-<%= pkg.version %>.js' : [
            appDir + 'js/dev/plugins.js',
            appDir + 'js/dev/modules.js',
            appDir + 'js/dev/main.js'
          ]
        }
      }
    },
    uglify: {
      prod: {
        options : {
          banner: '<%= meta.banner %>'
        },
        files: {
          'js/prod/plugins.js' : [ appDir + 'js/dev/plugins.js' ],
          'js/prod/modules.js' : [ appDir + 'js/dev/modules.js' ],
          'js/prod/main-<%= pkg.version %>.min.js' : [ appDir + 'js/prod/main-<%= pkg.version %>.js' ]
        }
      },
      requirejs: {
        options : {
          banner: '<%= meta.banner %>'
        },
        files: {
          'js/prod/main-<%= pkg.version %>.min.js' : [ appDir + 'js/prod/main.js' ]
        }
      }
    },
    cssmin: {
      css: {
        src: ['<banner:meta.banner>', appDir + 'css/dev/test.css'],
        dest: appDir + 'css/prod/test.css'
      }
    },
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'css/prod/',
        src: [ '**/*.css' ],
        dest: 'css/prod/'
      },
      jsmain: {
        options: {
          mode: 'gzip',
          archive: 'js/prod/main-<%= pkg.version %>.min.js.gz'
        },
        files: [
          { src: [ 'js/prod/main-<%= pkg.version %>.min.js' ], dest: 'js/prod/main-<%= pkg.version %>.min.js' }
        ]
      },
      jsmodules : {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'js/prod/',
        src: [ 'module/*.js', 'plugin/**/*.js' ],
        dest: 'js/prod/'
      }
    },
    imagemin: {
      img: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'dev/img/',
            src: [ '**/*.jpg', '**/*.png' ],
            dest: 'img/',
            filter: 'isFile'
          }
        ]
      }
    },
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: 'dev/img/',
            src: [ '**/*.gif', '**/*.svg' ],
            dest: 'img/'
          }
        ]
      }
    },
    watch: {
      dev: {
        files: [
          'Gruntfile.js',
          appDir + 'dev/coffee/**/*.coffee',
          appDir + 'dev/sass/**/*.scss'
        ],
        tasks: 'dev'
      },
      prod: {
        files: [
          'Gruntfile.js',
          appDir + 'dev/coffee/**/*.coffee',
          appDir + 'dev/sass/**/*.scss'
        ],
        tasks: 'prod'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask( 'img', [ 'clean:img', 'imagemin', 'copy:img' ] );

  grunt.registerTask( 'dev', [
    'clean:dev',
    'compass:dev',
    'coffee',
    'jshint'
  ]);
  grunt.registerTask( 'prod', [
    'clean:prod',
    'compass:prod',
    'coffee',
    'jshint',
    'requirejs:project',
    'uglify:requirejs'
  ]);

  grunt.registerTask( 'default', 'watch:dev' );
};
