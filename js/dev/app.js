/** jshint*/

/* global
  define,
  exports,
  module
*/

define(['jquery', 'module/accessifyhtml5', 'module/yaml-focusfix', 'antispammail', 'prettify'], function($, accessifyHTML5, YAML_focusFix, antiSpamMail, prettyPrint) {
  var App, DomReady;
  DomReady = (function() {
    function DomReady() {}

    DomReady.prototype.init = function() {
      var mobileScrollUp, yaml_focusfix;
      mobileScrollUp = function() {
        return window.scrollTo(0, 1);
      };
      setTimeout(mobileScrollUp, 100);
      this.jsClass();
      accessifyHTML5();
      yaml_focusfix = new YAML_focusFix();
      yaml_focusfix.init();
      if (typeof prettyPrint === "function") {
        prettyPrint();
      }
      return true;
    };

    DomReady.prototype.jsClass = function() {
      var html, htmlClasses, index;
      if ($) {
        $('html').removeClass('no-js').addClass('js');
      } else {
        html = document.getElementsByTagName('HTML')[0];
        if (html.className) {
          htmlClasses = html.className.split(' ');
          for (index in htmlClasses) {
            if (htmlClasses[index] === 'no-js') {
              htmlClasses[index] = 'js';
            }
          }
          html.className = htmlClasses.join(' ');
        }
      }
      return true;
    };

    return DomReady;

  })();
  App = (function() {
    function App() {}

    App.prototype.init = function() {
      return $(document).ready(function() {
        var domready;
        domready = new DomReady();
        return domready.init();
      });
    };

    return App;

  })();
  return App;
});

/*
//@ sourceMappingURL=app.js.map
*/