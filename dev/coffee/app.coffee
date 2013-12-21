###* jshint ###
### global
  define,
  exports,
  module
###

define [
  'jquery'
  'module/accessifyhtml5'
  'module/yaml-focusfix'
  'antispammail'
  'prettify'
  ], ( $, accessifyHTML5, YAML_focusFix, antiSpamMail, prettyPrint ) ->

  class DomReady
    constructor : ->

    init : ->
      mobileScrollUp = -> window.scrollTo 0, 1
      setTimeout mobileScrollUp, 100

      @jsClass()

      accessifyHTML5()

      yaml_focusfix = new YAML_focusFix()
      yaml_focusfix.init()

      #Hyphenator?.run()

      # Functions
      prettyPrint?()
      true

    jsClass : ->
      # replace class no-js in html element
      if $
        $('html').removeClass('no-js').addClass('js')
      else
        html = document.getElementsByTagName('HTML')[0]

        if html.className
          htmlClasses = html.className.split ' '

          for index of htmlClasses
            if htmlClasses[index] is 'no-js'
              htmlClasses[index] = 'js'

          html.className = htmlClasses.join ' '
      true

  class App
    constructor : ->

    init : ->
      $(document).ready () ->
        domready = new DomReady()
        domready.init()

  App
