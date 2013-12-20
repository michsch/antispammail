(function() {

  /**
   * main jQuery script file
   *
   * @author             Michael Schulze
   * @version            $1.0$
   * @copyright          Michael Schulze <elsigno.de>, 29 December, 2011
   * @license            All rights reserved. No usage without written permission.
   * @package            coffeescript, jquery
   * @requirements       jquery-1.7.1.min.js
   *
   * @lastmodified       $Date: 2011-12-29 21:43:28  +0100 (Thu, 29 Dec 2011) $
   *
  */

  var $, fancybox, fancyboxMore, getWindowWidth, init, lang, language, ll, responsive;

  jQuery.noConflict();

  $ = jQuery;

  language = 'de';

  lang = !language ? 'de' : language;

  ll = ['en', 'de'];

  ll['de'] = {
    from: 'von',
    to: 'bis',
    image: 'Bild'
  };

  jQuery(document).ready(function($) {
    return init();
  });

  /**
   * Init function for that page
   *
   * @return boolean true
  */

  init = function() {
    var mobileScrollUp, windowWidth;
    $.accessifyhtml5();
    $('html').removeClass('no-js').addClass('js');
    mobileScrollUp = function() {
      return window.scrollTo(0, 1);
    };
    setTimeout(mobileScrollUp, 100);
    windowWidth = getWindowWidth();
    responsive(windowWidth, false);
    $(window).resize(function() {
      return responsive(getWindowWidth(), true);
    });
    if (navigator.userAgent.indexOf("Windows") === -1 || (navigator.userAgent.indexOf("Windows") > -1 && navigator.userAgent.indexOf("Firefox") === -1)) {
      $('html').addClass('webfonts');
    }
    return true;
  };

  /**
   * Function for responsive design
   *
   * @param integer width of window in pixel
   * @param boolean true if window is resized
   *
   * @return boolean true
  */

  responsive = function(windowWidth, resize) {
    return true;
  };

  /**
   * Gets the actual window width
   *
   * @param object jQuery object
   * @return integer window width in pixel
  */

  getWindowWidth = function() {
    var ielt9, windowWidth;
    windowWidth = window.innerWidth;
    if (!windowWidth) {
      ielt9 = true;
      windowWidth = $('body').width();
    }
    return windowWidth;
  };

  /*
   * Fancybox popup
   *
   * @return boolean true
  */

  fancyboxMore = function() {
    if ($('*').is('a.jqfancybox-more')) {
      $('a.jqfancybox-more').click(function(event) {
        var content;
        event.preventDefault();
        content = $($(this).attr('href')).html();
        return $.fancybox(content, {
          autoDimensions: true,
          width: 600,
          padding: 40,
          height: 'auto',
          transitionIn: 'none',
          transitionOut: 'none'
        });
      });
    }
    return true;
  };

  /**
   * Activate fancybox
   *
   * @return boolean true
  */

  fancybox = function() {
    var options;
    if ($("*").is(".jqfancybox")) {
      options = {
        padding: 12,
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        transitionIn: "elastic",
        transitionOut: "elastic",
        titlePosition: "over",
        titleShow: true,
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        overlayShow: true,
        overlayOpacity: 0.4,
        overlayColor: "#666",
        centerOnScroll: false,
        hideOnContentClick: false,
        onComplete: function() {
          return $("#fancybox-wrap").hover(function() {
            return $("#fancybox-title").show();
          }, function() {}, $("#fancybox-title").hide());
        },
        titleFormat: function(title, currentArray, currentIndex, currentOpts) {
          return '<span id="fancybox-title-over">' + ll[lang].image + ' ' + (currentIndex + 1) + ' ' + ll[lang].from + ' ' + currentArray.length + (title.length ? ': &nbsp; ' + title : '') + '</span>';
        }
      };
      $(".jqfancybox").fancybox(options);
    }
    return true;
  };

}).call(this);
