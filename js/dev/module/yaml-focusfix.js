/* jshint devel:true*/

/* globals
  define,
  require,
  module,
  exports
*/

/**
* "Yet Another Multicolumn Layout" - YAML CSS Framework
*
* (en) Workaround for IE8 und Webkit browsers to fix focus problems when using skiplinks
* (de) Workaround für IE8 und Webkit browser, um den Focus zu korrigieren, bei Verwendung von Skiplinks
*
* @note            inspired by Paul Ratcliffe's article
*                  http://www.communis.co.uk/blog/2009-06-02-skip-links-chrome-safari-and-added-wai-aria
*                  Many thanks to Mathias Schäfer (http://molily.de/) for his code improvements
*
* @copyright       Copyright 2005-2012, Dirk Jesse
* @license         CC-BY 2.0 (http://creativecommons.org/licenses/by/2.0/),
*                  YAML-CDL (http://www.yaml.de/license.html)
* @link            http://www.yaml.de
* @package         compass,sass,yaml
* @version         4.0+
* @revision        $Revision: 617 $
* @lastmodified    $Date: 2012-01-05 23:56:54 +0100 (Do, 05 Jan 2012) $
*/

(function(root, factory, sr) {
  "use strict";
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root[sr] = factory();
    root[sr.toLowerCase()] = new root[sr]();
    if (typeof root.jQuery === 'function') {
      root.jQuery(document).ready(function() {
        return root[sr.toLowerCase()].init();
      });
    }
  }
})((typeof window === 'object' && window) || this, function() {
  "use strict";
  var YAML_focusFix;
  YAML_focusFix = (function() {
    var focus, o, skipClass, trim;

    o = {};

    skipClass = "ym-skip";

    function YAML_focusFix(optionSkipClass) {
      this.skipClass = optionSkipClass;
      if (typeof optionSkipClass !== 'undefined') {
        this.skipClass = optionSkipClass;
      } else {
        this.skipClass = skipClass;
      }
    }

    YAML_focusFix.prototype.init = function(optionSkipClass) {
      var body, handler, is_ie, is_webkit, userAgent;
      if (typeof optionSkipClass !== void 0) {
        this.skipClass = optionSkipClass;
      }
      userAgent = navigator.userAgent.toLowerCase();
      is_webkit = userAgent.indexOf('webkit') > -1;
      is_ie = userAgent.indexOf('msie') > -1;
      if (is_webkit || is_ie) {
        body = document.body;
        handler = this.click;
        if (body.addEventListener) {
          return body.addEventListener('click', handler, false);
        } else {
          if (body.attachEvent) {
            return body.attachEvent('onclick', handler);
          }
        }
      }
    };

    YAML_focusFix.prototype.click = function(e) {
      var a, cls, i, target, _results;
      e = e || window.event;
      target = e.target || e.srcElement;
      a = target.className.split(' ');
      i = 0;
      _results = [];
      while (i < a.length) {
        cls = trim(a[i]);
        if (cls === skipClass) {
          focus(target);
          break;
        }
        _results.push(i++);
      }
      return _results;
    };

    focus = function(link) {
      var href, id, target;
      if (link.href) {
        href = link.href;
        id = href.substr(href.indexOf('#') + 1);
        target = document.getElementById(id);
        if (target) {
          target.setAttribute('tabindex', '-1');
          return target.focus();
        }
      }
    };

    trim = function(str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };

    return YAML_focusFix;

  })();
  return YAML_focusFix;
}, 'YAML_focusFix');

/*
//@ sourceMappingURL=yaml-focusfix.js.map
*/