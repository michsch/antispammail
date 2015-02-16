
/* jshint -W064 */

/** global
 */
var jqueryModuleName;

require.config({
  "urlArgs": "v=0.1.3",
  "paths": {
    "domReady": "module/requirejs-domready",
    "jquery": ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min", "vendor/jquery-1.11.2"],
    "jquery-migrate": "vendor/jquery-migrate-1.2.1",
    "antispammail": "module/antispammail",
    "hyphenator": "module/hyphenator",
    "matchmedia": "module/matchmedia",
    "picturefill": "module/picturefill",
    "prettify": "module/prettify"
  },
  "shim": {
    "jquery-migrate": ["jquery"],
    "antispammail": {
      exports: "antiSpamMail"
    },
    "hyphenator": {
      exports: "Hyphenator"
    },
    "picturefill": {
      deps: ["matchmedia"],
      exports: "picturefill"
    },
    "prettify": {
      exports: "prettyPrint"
    }
  }
});

if (typeof window.jQuery === 'function') {
  if (typeof define === 'function' && define.amd) {
    jqueryModuleName = 'jquery';
    define(jqueryModuleName, [], function() {
      return window.jQuery.noConflict();
    });
  } else {
    window.jQuery.noConflict();
  }
}

require(['app'], function(App) {
  var app;
  app = new App();
  return app.init();
});

//# sourceMappingURL=main.js.map
