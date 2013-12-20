
  /**
   * plugins file with some jQuery plugins and standard functions
   *
   * @author             Michael Schulze
   * @version            $1.0$
   * @copyright          Michael Schulze <elsigno.de>, 29 December, 2011
   * @license            All rights reserved. No usage without written permission.
   * @package            coffeescript, jquery
   * @requirements       jquery-1.7.1.min.js
   *
   * @lastmodified       $Date: 2011-12-29 21:45:44  +0100 (Thu, 29 Dec 2011) $
   *
  */

  /**
  usage: log('inside coolFunc', this, arguments);
  paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  */

  window.log = function() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
      arguments.callee = arguments.callee.caller;
      return console.log(Array.prototype.slice.call(arguments));
    }
  };

  /*
  make it safe to use console.log always
  */

  (function(b) {
    var a, c, d, _results;
    c = function() {};
    d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
    _results = [];
    while (a = d.pop()) {
      _results.push(b[a] = b[a] || c);
    }
    return _results;
  })(window.console = window.console || {});

  (function($) {
    var firstplugin;
    $.accessifyhtml5 = function(options) {
      var fixes;
      fixes = {
        'header.site': {
          'role': 'banner'
        },
        'footer.site': {
          'role': 'contentinfo'
        },
        'article': {
          'role': 'article'
        },
        'aside': {
          'role': 'complementary'
        },
        'nav': {
          'role': 'navigation'
        },
        'output': {
          'aria-live': 'polite'
        },
        'section': {
          'role': 'region'
        },
        '[required]': {
          'aria-required': 'true'
        }
      };
      $.each(fixes, function(index, item) {
        return $(index).attr(item);
      });
      return true;
    };
    firstplugin = {
      init: function(options) {
        var defaults, el, firstload, o;
        defaults = {
          resize: 1
        };
        o = $.extend(defaults, options || {});
        firstload = 1;
        el = this;
        if (o.resize === 1) {
          $(window).resize(function() {
            var firstLoad;
            firstLoad = 0;
            firstplugin.update(o);
            return true;
          });
          return this.each(function() {});
        }
      },
      update: function(o) {
        return el.each(function() {});
      }
    };
    $.fn.firstplugin = function(method) {
      if (firstplugin[method]) {
        return firstplugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return firstplugin.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery.firstplugin');
      }
    };
    $.secondplugin = function(options) {
      var defaults, o;
      defaults = {
        resize: 1
      };
      o = $.extend(defaults, options || {});
      return true;
    };
    return true;
  })(jQuery);

  /**
   * "Yet Another Multicolumn Layout" - (X)HTML/CSS Framework
   *
   * (en) Workaround for IE8 und Webkit browsers to fix focus problems when using skiplinks
   * (de) Workaround für IE8 und Webkit browser, um den Focus zu korrigieren, bei Verwendung von Skiplinks
   *
   * @note			inspired by Paul Ratcliffe's article 
   *					http://www.communis.co.uk/blog/2009-06-02-skip-links-chrome-safari-and-added-wai-aria
   *                  Many thanks to Mathias Schäfer (http://molily.de/) for his code improvements
   *
   * @copyright       Copyright 2005-2011, Dirk Jesse
   * @license         CC-A 2.0 (http://creativecommons.org/licenses/by/2.0/),
   *                  YAML-C (http://www.yaml.de/en/license/license-conditions.html)
   * @link            http://www.yaml.de
   * @package         yaml
   * @version         3.3.1
   * @revision        $Revision: 501 $
   * @lastmodified    $Date: 2011-06-18 17:27:44 +0200 (Sa, 18 Jun 2011) $
  */

  (function() {
    var YAML_focusFix;
    YAML_focusFix = {
      skipClass: 'skip',
      init: function() {
        var body, handler, is_ie, is_webkit, userAgent;
        userAgent = navigator.userAgent.toLowerCase();
        is_webkit = userAgent.indexOf('webkit') > -1;
        is_ie = userAgent.indexOf('msie') > -1;
        if (is_webkit || is_ie) {
          body = document.body;
          handler = YAML_focusFix.click;
          if (body.addEventListener) {
            return body.addEventListener('click', handler, false);
          } else if (body.attachEvent) {
            return body.attachEvent('onclick', handler);
          }
        }
      },
      trim: function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      },
      click: function(e) {
        var a, cls, target, _i, _len, _results;
        e = e || window.event;
        target = e.target || e.srcElement;
        a = target.className.split(' ');
        _results = [];
        for (_i = 0, _len = a.length; _i < _len; _i++) {
          cls = a[_i];
          cls = YAML_focusFix.trim(a[_i]);
          if (cls === YAML_focusFix.skipClass) {
            YAML_focusFix.focus(target);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      focus: function(link) {
        var href, id, target;
        if (link.href) {
          href = link.href;
          id = href.substr(href.indexOf('#') + 1);
          target = document.getElementById(id);
          if (target) {
            target.setAttribute("tabindex", "-1");
            return target.focus();
          }
        }
      }
    };
    return YAML_focusFix.init();
  })();

  /**
   * JavaScript email encrypter
   *
   * @author             Michael Schulze
   * @version            $1.0$
   * @copyright          Michael Schulze, 31 December, 2011
   * @license            GNU General Public License, version 3 (GPL-3.0)
   * @package            coffeescript
   *
   * @lastmodified       $Date: 2011-12-31 20:29:35  +0100 (Sat, 31 Dec 2011) $
   *
  */

  (function(window) {
    /**
     * Crypt given mail
     *
     * @param string email address
     * @param boolean true
    */
    var UnCryptMailto;
    window.CryptMailto = function() {
      var cryptform, e, formname, i, n, r, radioObj, radioValue, s;
      formname = 'cryptmail';
      cryptform = document.forms[formname];
      n = 0;
      r = "";
      s = "mailto:" + cryptform.cryptmail_email.value;
      e = cryptform.cryptmail_email.value;
      if (cryptform.cryptmail_email.value.length < 4) return false;
      radioObj = cryptform.cryptmail_radio;
      if (radioObj.length > 0) {
        i = 0;
        while (i < radioObj.length) {
          radioValue = parseInt(radioObj[i].checked ? radioObj[i].value : void 0, 0);
          i++;
        }
      } else {
        radioValue = 0;
      }
      if (radioValue === 1) {
        e = e.replace(/\./g, '<span class="crypt">.</span>.<span class="crypt">.</span>');
        e = e.replace(/@/, '<span class="crypt">.</span>@<span class="crypt">.</span>');
      } else {
        e = e.replace(/\./g, ' [dot] ');
        e = e.replace(/@/, ' [at] ');
      }
      i = 0;
      while (i < s.length) {
        n = s.charCodeAt(i);
        if (n >= 8364) n = 128;
        r += String.fromCharCode(n + 1);
        i++;
      }
      cryptform.cryptmail_cryptedmail.value = r;
      cryptform.cryptmail_html.value = '<a href="javascript:linkTo_UnCryptMailto(\'' + r + '\');">' + "\n\t" + e + "\n" + '</a>';
      return true;
    };
    /**
     * Uncrypt the email address and returns the valid href
     *
     * @param string the crypted string
     * @return string valid href
    */
    UnCryptMailto = function(s) {
      var i, n, r;
      n = 0;
      r = "";
      i = 0;
      while (i < s.length) {
        n = s.charCodeAt(i);
        if (n >= 8364) n = 128;
        r += String.fromCharCode(n - 1);
        i++;
      }
      return r;
    };
    /**
     * Public function for A tags
     *
     * @param string the crypted string
     * @return boolean true
    */
    window.linkTo_UnCryptMailto = function(s) {
      location.href = UnCryptMailto(s);
      return true;
    };
    return true;
  })(window);
