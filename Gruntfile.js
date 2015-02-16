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
        ' * <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n' +
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
      version: {
        files: {
          './': [
            'coffee/**/*.coffee'
          ]
        },
        options: {
          replacements: [
            {
              pattern : /_version\:( *)\'(?:[\d]+\.[\d]+\.[\d]+)\'/ig,
              replacement : '_version:$1\'<%= pkg.version %>\''
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
      ]
    },
    requirejs: {
      compile: {
        options: {
          dir: 'build',
          appDir: 'src',
          baseUrl: '.',
          optimize: "none",
          optimizeCss: "none",
          useStrict: true,
          paths: {
            "antispam-mail-init" : "../tmp/antispam-mail-init"
          },
          modules : config.modules,
          fileExclusionRegExp: /^(.git|.gitignore|node_modules|coffee|media|test|old|.*\.map|.*\.sublime-.*)$/,
          wrap: {
            start: '<%= banner.full %>' + "\n" +
              ";(function (root, factory, name) {\n  'use strict';\n" +
              "  root[name] = factory();\n" +
              "  if (typeof define === 'function' && define.amd) {\n" +
              "    define(function() { return root[name]; });\n" +
              "  } else if (typeof exports === 'object') {\n" +
              "    module.exports = root[name];\n" +
              "  }\n" +
              "})((typeof window === 'object' && window) || this, function () {\n" +
              "  'use strict';\n",
            end: "  return antiSpamMail;\n" +
            "}, '<%= pkg.name %>');"
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
          'dist/antispammail.js': 'build/antispammail.js',
          'dist/antispammail-decrypt.js': 'build/antispammail-decrypt.js',
          'dist/antispammail-encrypt.js': 'build/antispammail-encrypt.js'
        }
      }
    },
    stripdefine: {
      build: [
        'dist/**/*.js'
      ]
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
    watch: {
      build: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee'
        ],
        tasks: [ 'build' ]
      }
    }
  });

    // Load grunt-compass plugin
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
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
      // Remove `define("antispammail..." ...)`
      var mod = grunt.file.read(filepath).replace(/define\("antispammail(-decrypt|-encrypt)?"\, function\(\)\{\}\);/g, '');
      grunt.file.write(filepath, mod);
    });
  });

  grunt.registerTask( 'version', [
    'string-replace:version'
  ]);

  grunt.registerTask( 'build', [
    'clean:coffee',
    'version',
    'coffee',
    'jshint',
    'requirejs:compile',
    'copy:build',
    'stripdefine',
    'clean:build',
    'uglify'
  ]);

  grunt.registerTask( 'default', [
    'build'
  ]);

  grunt.registerTask( 'travis', [
    'jshint',
    'uglify'
  ]);

};
