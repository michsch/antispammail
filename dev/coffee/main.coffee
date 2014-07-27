### jshint -W064 ###
###* global
###

require.config({
  #"urlArgs": "bust=" + ( new Date() ).getTime(),
  "urlArgs": "v=0.1.3",
  "paths": {
    "domReady": "module/requirejs-domready",
    "jquery": [
      "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
      "vendor/jquery-1.11.1"
    ],
    "jquery-migrate": "vendor/jquery-migrate-1.1.1",
    "antispammail": "module/antispammail",
    "hyphenator": "module/hyphenator",
    "matchmedia": "module/matchmedia",
    "picturefill": "module/picturefill",
    "prettify": "module/prettify"
  },
  "shim": {
    "jquery-migrate": [ "jquery" ],
    "antispammail": {
      exports: "antiSpamMail"
    },
    "hyphenator": {
      exports: "Hyphenator"
    },
    "picturefill": {
      deps: [ "matchmedia" ],
      exports: "picturefill"
    },
    "prettify": {
      exports: "prettyPrint"
    }
  }
})

if typeof window.jQuery is 'function'
  if typeof define is 'function' and define.amd
    jqueryModuleName = 'jquery'
    define jqueryModuleName, [], () ->
      window.jQuery.noConflict()
  else
    window.jQuery.noConflict()

require ['app'], ( App ) ->
  app = new App()
  app.init()
