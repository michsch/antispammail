### jshint devel:true ###
### globals
  define,
  require,
  module,
  exports
###

###*
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
###

(( root, factory, sr ) ->
  "use strict"

  # CommonJS
  if typeof exports is 'object'
    module.exports = factory()
  # AMD
  else if typeof define is 'function' and define.amd
    define [], factory
  # Browser
  else
    root[sr] = factory()
    root[sr.toLowerCase()] = new root[sr]()

    # use jQuery domReady function
    if typeof root.jQuery is 'function'
      root.jQuery( document ).ready () ->
        root[sr.toLowerCase()].init()

  return
) (typeof window is 'object' and window) or @, () ->
  "use strict"

  class YAML_focusFix
    o = {}
    skipClass = "ym-skip"

    constructor: ( optionSkipClass ) ->
      @skipClass = optionSkipClass

      if typeof optionSkipClass isnt 'undefined'
        @skipClass = optionSkipClass
      else
        @skipClass = skipClass

    init : ( optionSkipClass ) ->
      if typeof optionSkipClass isnt undefined
        @skipClass = optionSkipClass

      userAgent = navigator.userAgent.toLowerCase()
      is_webkit = userAgent.indexOf('webkit') > -1
      is_ie = userAgent.indexOf('msie') > -1
      if is_webkit or is_ie
        body = document.body
        handler = @click
        if body.addEventListener
          body.addEventListener 'click', handler, false
        else
          body.attachEvent 'onclick', handler  if body.attachEvent

    click : (e) ->
      e = e or window.event
      target = e.target or e.srcElement
      a = target.className.split(' ')
      i = 0
      _results = []
      while i < a.length
        cls = trim(a[i])
        if cls is skipClass
          focus target
          break
        _results.push i++
      _results

    focus = (link) ->
      if link.href
        href = link.href
        id = href.substr(href.indexOf('#') + 1)
        target = document.getElementById(id)
        if target
          target.setAttribute 'tabindex', '-1'
          target.focus()

    trim = (str) ->
      str.replace(/^\s\s*/, '').replace /\s\s*$/, ''

  YAML_focusFix
, 'YAML_focusFix'
