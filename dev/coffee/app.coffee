### jshint devel:true ###
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
      @loadGithubProfile()
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

    loadGithubProfile : ->
      @$githubProfile = $ '.github-profile'

      if @$githubProfile
        $.ajax
          url: 'https://api.github.com/users/michsch',
          dataType: 'json'
          success: (data) =>
            @buildGithubAvatar data
          error: (data) =>
            @$githubProfile.addClass 'error'
      true

    buildGithubAvatar : (data) ->
      console.log data

      if typeof data is 'object' and data.avatar_url
        avatarUrl = data.avatar_url + '&s=440'

        $img = $ '<img src="' + avatarUrl + '" alt="' +
          'Github profile picture of ' + data.login + '">'

        $link = $ '<a href="' + data.blog + '" title="' + 'Website of ' + data.login + '" itemprop="url">'

        $link.append $img
        @$githubProfile.append $link
      true

  class App
    constructor : ->

    init : ->
      $(document).ready () ->
        domready = new DomReady()
        domready.init()

  App
