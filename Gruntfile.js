module.exports = function(grunt) {
  "use strict";

  var config = grunt.file.readJSON('config-all.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    banner: {
      compact: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> |' +
        ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
      full: '/*!\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * <%= _.pluck(pkg.licenses, "type").join(", ") %>*/\n' +
        ' \n' +
        '/*\n' +
        ' * Permission is hereby granted, free of charge, to any person obtaining a\n' +
        ' * copy of this software and associated documentation files (the "Software"),\n' +
        ' * to deal in the Software without restriction, including without limitation\n' +
        ' * the rights to use, copy, modify, merge, publish, distribute, sublicense,\n' +
        ' * and/or sell copies of the Software, and to permit persons to whom the\n' +
        ' * Software is furnished to do so, subject to the following conditions:\n' +
        ' *\n' +
        ' * The above copyright notice and this permission notice shall be included\n' +
        ' * in all copies or substantial portions of the Software.\n' +
        ' *\n' +
        ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
        ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
        ' * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL\n' +
        ' * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER.\n' +
        ' * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
        ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n' +
        ' * THE SOFTWARE.\n' +
        ' */'
    },
    clean: {
      build: [
        'build'
      ],
      coffee: [
        'src/**/*.js',
        'src/**/*.map'
      ],
      dist: [
        'src/**/*.js',
        'src/**/*.map',
        'dist/**/*.js'
      ],
      gz: [
        'dist/**/*.gz',
        'dist/**/*.gz.css',
        'dist/**/*.gz.js'
      ]
    },
    coffee: {
      options: {
        bare: true
      },
      all: {
        expand: true,
        cwd: 'coffee',
        src: [
          '**/*.coffee',
          '!**/_nu/**/*.coffee'
        ],
        dest: 'src/',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        },
        //ext: '.js',
        options: {
          sourceMap: false
        }
      }
    },
    'string-replace': {
      comments: {
        files: {
          './': [
            'dev/sass/*.scss',
            'dev/coffee/**/*.coffee'
          ]
        },
        options: {
          replacements: [
            {
              pattern : /@version( *)(?:\$.*)/ig,
              replacement : '@version$1$$<%= pkg.version %>$'
            },
            {
              pattern : /@author( *)(?:.*)/ig,
              replacement : '@author$1<%= pkg.author.name %>'
            },
            {
              pattern: /\/\*\! (?:[\w\d \.\-\_\$\+]+)(?: \- )(?:[\w\d\s\S])*\*\/(?:.*\s *\s)/i,
              replacement: '<%= meta.banner %>'
              //replacement: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + date.fullDate
            }
          ]
        }
      }
    },
    jshint : {
      options : {
        jshintrc: 'src/.jshintrc'
      },
      gruntfile : {
        options : {
          jshintrc: '.jshintrc'
        },
        src : [ 'Gruntfile.js' ]
      },
      main : [
        'src/**/*.js'
      ],
      test : {
        //options: {
        //  jshintrc: appDir + 'js/test/.jshintrc'
        //},
        src : [ 'test/**/*.js' ]
      }
    },
    requirejs: {
      compile: {
        options: {
          dir: 'build',
          appDir: '.',
          baseUrl: 'src',
          optimize: "none",
          optimizeCss: "none",
          useStrict: true,
          paths: {
            "antispam-mail-init" : "../tmp/antispam-mail-init"
          },
          modules : config.modules,
          fileExclusionRegExp: /^(.git|.gitignore|node_modules|coffee|media|test|old|.*\.map|.*\.sublime-.*)$/,
          wrap: {
            start: '<%= banner.full %>' + "\n;(function(window, document, undefined){\n  'use strict';",
            end: "  if (typeof define === 'function' && define.amd) {\n" +
              "    define('antiSpamMail', [], function() { return antiSpamMail; });\n" +
              "  }\n" +
              "})(this, document);\n"
          },
          onBuildWrite: function (id, path, contents) {
            if ((/define\(.*?\{/).test(contents)) {
              //Remove AMD ceremony for use without require.js or almond.js
              contents = contents.replace(/define\(.*?\{/, '');
              contents = contents.replace(/\}\);\s*?$/,'');
            }
            else if ((/require\([^\{]*?\{/).test(contents)) {
              contents = contents.replace(/require[^\{]+\{/, '');
              contents = contents.replace(/\}\);\s*$/,'');
            }
            return contents;
          }
        }
      }
    },
    copy: {
      build: {
        files: {
          'dist/antispammail.js': 'build/src/antispammail.js',
          'dist/antispammail-decrypt.js': 'build/src/antispammail-decrypt.js',
          'dist/antispammail-encrypt.js': 'build/src/antispammail-encrypt.js'
        }
      }
    },
    stripdefine: {
      build: [
        'dist/**/*.js'
      ]
    },
    qunit: {
      all: [ 'test/**/*.html' ]
    },
    uglify: {
      prod: {
        options : {
          stripbanners: true,
          banner: '<%= banner.compact %>',
          mangle: {
            except: [ 'antiSpamMail' ]
          },
          beautify: {
            ascii_only: true
          }
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [ '**/*.js', '!**/*.min.js', '!_nu/**/*.js', "!old/**/*.js" ],
            dest: 'dist/',
            rename: function( destPath, srcPath ) {
              var dest;
              dest = destPath + srcPath.replace( /(\.min)?\.js$/, ".min.js" );
              return dest;
            }
          }
        ]
      }
    },
    cssmin: {
      prod: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'dist/antispammail.min.css': [ 'dist/antispammail.css' ]
        }
      }
    },
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [ '*min.js' ],
            dest: 'dist/',
            rename: function( destPath, srcPath ) {
              var dest;
              dest = destPath + srcPath.replace(/\.css$/,".css.gz");
              return dest;
            }
          }
        ]
      },
      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [ '*.min.css' ],
            dest: 'dist/',
            rename: function( destPath, srcPath ) {
              var dest;
              dest = destPath + srcPath.replace(/\.js$/,".js.gz");
              return dest;
            }
          }
        ]
      },
    },
    watch: {
      build: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee'
        ],
        tasks: [ 'build' ]
      },
      min: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee'
        ],
        tasks: [ 'min' ]
      }
    }
  });

    // Load grunt-compass plugin
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-string-replace');

  // Strip define fn
  grunt.registerMultiTask('stripdefine', "Strip define call from dist file", function() {
    this.filesSrc.forEach(function(filepath) {
      // Remove `define("modernizr-init" ...)` and `define("modernizr-build" ...)`
      var mod = grunt.file.read(filepath).replace(/define\("antispammail(-decrypt|-encrypt)?"\, function\(\)\{\}\);/g, '');

      // Hack the prefix into place. Anything is way too big for something so small.
      /*if ( modConfig && modConfig.classPrefix ) {
        mod = mod.replace("classPrefix : '',", "classPrefix : '" + modConfig.classPrefix.replace(/"/g, '\\"') + "',");
      }*/
      grunt.file.write(filepath, mod);
    });
  });

  grunt.registerTask( 'build', [ 'clean:coffee', 'coffee', 'jshint', 'requirejs', 'copy', 'stripdefine', 'clean:build' ] );
  grunt.registerTask( 'min', [ 'build', 'uglify' ] );

  grunt.registerTask( 'comments', [ 'string-replace:comments' ] );

  grunt.registerTask( 'default', [ 'watch:build' ]);
};
