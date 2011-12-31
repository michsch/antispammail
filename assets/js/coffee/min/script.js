###*
usage: log('inside coolFunc', this, arguments);
paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
###
window.log = ->
  log.history = log.history or []
  log.history.push arguments
  if @console
    arguments.callee = arguments.callee.caller
    console.log Array::slice.call(arguments)

###
make it safe to use console.log always
###
((b) ->
  c = ->
  d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",")
  while a = d.pop()
    b[a] = b[a] or c
) window.console = window.console or {}

( ($) ->
   # Accessifyhtml5.js
   # Adds ARIA to new elements in browsers which don’t do it by themselves.
   #
   # originally by Eric Eggert
   # https://github.com/yatil/accessifyhtml5.js/blob/master/accessifyhtml5.js
	$.accessifyhtml5 = ( options ) ->
		fixes =
			'header.site'   : { 'role':          'banner'        }
			'footer.site'   : { 'role':          'contentinfo'   }
			'article'       : { 'role':          'article'       }
			'aside'         : { 'role':          'complementary' }
			'nav'           : { 'role':          'navigation'    }
			'output'        : { 'aria-live':     'polite'        }
			'section'       : { 'role':          'region'        }
			'[required]'    : { 'aria-required': 'true'          }

		$.each(fixes, (index, item) ->
			$(index).attr(item)
		)

		true

	firstplugin =
    init : ( options ) ->
      defaults = 
        resize: 1
      o = $.extend(defaults, options || {})
      firstload = 1
      el = this

      # active update function if window is resized
      if o.resize == 1
        $(window).resize( ->
          firstLoad = 0
          firstplugin.update(o)
          true
        )

        this.each( ->
          # place your plugin code here
        )

    update: (o) ->
      el.each( ->
        # place your plugin code for the update function here
      )

  $.fn.firstplugin = ( method ) ->
    # Method calling logic
    if firstplugin[method]
      firstplugin[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
    else if typeof method == 'object' or ! method
      firstplugin.init.apply( this, arguments )
    else
      $.error( 'Method ' +  method + ' does not exist on jQuery.firstplugin' )

  $.secondplugin = ( options ) ->
    defaults =
      resize: 1
    o = $.extend(defaults, options || {})

    # place your plugin code here

    true

  true

)(jQuery)

###*
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
###
( ->
	YAML_focusFix =
		skipClass : 'skip'
		
		init : ->
			userAgent = navigator.userAgent.toLowerCase()
			is_webkit = userAgent.indexOf('webkit') > -1
			is_ie = userAgent.indexOf('msie') > -1
			
			if is_webkit or is_ie
				body = document.body
				handler = YAML_focusFix.click
				if body.addEventListener
					body.addEventListener('click', handler, false)
				else if body.attachEvent
					body.attachEvent('onclick', handler)
		
		trim : (str) ->
			str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
		
		click : (e) ->
      e = e || window.event
      target = e.target || e.srcElement
      a = target.className.split(' ')
			
      for cls in a
        cls = YAML_focusFix.trim(a[_i])
        if cls == YAML_focusFix.skipClass
          YAML_focusFix.focus(target)
          break
		
		focus : (link) ->
			if link.href
				href = link.href
				id = href.substr(href.indexOf('#') + 1)
				target = document.getElementById(id)
				if target
					target.setAttribute("tabindex", "-1")
					target.focus()

	YAML_focusFix.init();
)();

 ### -------------------------------------------- 
     Begin script.coffee 
 -------------------------------------------- ### 

#@codekit-prepend "plugins.coffee"

###*
 * Central jQuery javascript file
 *
 * @creator					Michael Schulze <m.schulze@elsigno.de>
 * @copyright				Copyright 2011, Michael Schulze
 * @license         no usage without written permission
 * @package         typo3boilerplate,
 *                  coffeescript
 * @requirements		jquery-1.6.2.min.js
 *
###
jQuery.noConflict()

$ = jQuery

lang = if !language then 'de' else language

ll = ['en', 'de']
ll['de'] =
	from: 'von'
	to: 'bis'
	image: 'Bild'

jQuery(document).ready( ($) -> init())

###*
 * Init function for that page
 *
 * @return {boolean} true
###
init = ->
 	$.accessifyhtml5()
		$('html').removeClass('no-js').addClass('js')
		
		mobileScrollUp = -> window.scrollTo(0, 1)
		setTimeout mobileScrollUp,100

		# Functions
		photovotingLinks()
		navigation()
		asideBackgroundCover()
		fancybox()
		applicationFormValidation()

		# Responsive view
		windowWidth = getWindowWidth()
		responsive(windowWidth, false)
		$(window).resize -> responsive(getWindowWidth(), true)

		if navigator.userAgent.indexOf("Windows") == -1 or (navigator.userAgent.indexOf("Windows") > -1 and navigator.userAgent.indexOf("Firefox") == -1)
			$('html').addClass('webfonts')
		
		true

###*
 * Function for responsive design
 *
 * @param {Int} width of window in pixel
 * @param {boolean} true if window is resized
 *
 * @return {boolean} true
###
responsive = (windowWidth, resize) ->

	# do everytime when window is resized

	# in a special range
	#if windowWidth <= 768 and windowWidth > 480

	# smaller than x
	#if windowWidth <= 840

	#if windowWidth <= 768

	#if windowWidth <= 640

	#if windowWidth <= 520

	#if windowWidth <= 480


	# larger than x
	#if windowWidth > 840

	#if windowWidth > 768

	#if windowWidth > 640

	#if windowWidth > 520

	# do only after first loading
	#if resize == false

	# do only if window is resizing
	#if resize == true

	true

###*
 * Gets the actual window width
 *
 * @param {Object} jQuery object
 * @return {Int} window width in pixel
###
getWindowWidth = ->
	windowWidth = window.innerWidth
	if !windowWidth
		ielt9 = true
		windowWidth = $('body').width()
	windowWidth

###*
 * Creates the DropDown navigation with hoverIntent plugin
 *
 * @return {boolean} true
###
navigation = ->
	navHover =
		over : navOverFunction
		out : navOutFunction
		timeout: 200

	$("#nav div.hlist > ul:first-child > li > a").hoverIntent( navHover )

	true

###*
 * Main navigation mouseOver
 *
 * @return {boolean} true
###
navOverFunction = ->
	$ = jQuery
	
	if $(this).next('ul').length > 0
		$(this).parent('li').addClass('hover')
		$(this).next('ul').slideDown(200)

	true;

###*
 * Main navigation mouseOut
 *
 * @return {boolean} true
###
navOutFunction = ->
  $ = jQuery

  link = $(this)
  li = link.parent('li')
  ul = link.next('ul')
  liOffset = li.offset()
  ulOffset = ul.offset()

  ###
  $('html').mousemove((e) ->
      window.posX = e.pageX
      window.posY = e.pageY
      true
    )

  checkMouseOver = window.setInterval( ->
      posX = window.posX
      posY = window.posY

      if posX < liOffset.left or
        posY < liOffset.top or
        posX > (liOffset.left + ul.width()) or
        (posY > liOffset.top and posY < (liOffset.top + li.height() + 25) and posX > (liOffset.left + li.width()) ) or
        posY > (liOffset.top + li.height() + ul.height() + 25)

          ul.slideUp(100, -> li.removeClass('hover') )
          window.clearInterval(checkMouseOver)
          true
    ,100)
  ###

  $('html').mousemove((e) ->
  		posX = e.pageX
  		posY = e.pageY

  		if posX < liOffset.left or
  			posY < liOffset.top or
  			posX > (liOffset.left + ul.width()) or
  			(posY > liOffset.top and posY < (liOffset.top + li.height() + 25) and posX > (liOffset.left + li.width()) ) or
  			posY > (liOffset.top + li.height() + ul.height() + 25)
	
  				ul.slideUp(100, -> li.removeClass('hover') )
  				$('html').unbind()
  				true
    )
  true

###*
 * Right column images as cover
 *
 * @return {boolean} true
###
asideBackgroundCover = ->
	aside = $('#col3_content')
	image = aside.find('.sidebarImage img:last')
	imagePath = image.attr('src')
	abcd = 1

	# do only if browser supports background-size (checked by modernizr) #
	if Modernizr.backgroundsize and image
		if imagePath.indexOf('/') > -1
			aside.height(aside.parent().height()).css({
				'background-image' : 'url(' + imagePath + ')'
				'background-position' : 'center top'
				'-moz-background-size' : 'cover'
				'-webkit-background-size' : 'cover'
				'-o-background-size' : 'cover'
				'background-size' : 'cover'
			})
			aside.find('.sidebarImage img').css('visibility', 'hidden');
			#aside.html('')
	else
		aside.height(aside.parent().height()).prepend(image)

		resizeImage(image)
			
		$(window).resize( -> resizeImage(image) )

	true

###*
 * Resize the image to fullscreen in the parent container like background-size: cover
 *
 * @param {object} Image
 *
 * @return {boolean} true
###
resizeImage = (image) ->
	
	image.load( ->
		aside = $('#col3_content')
		imagePath = image.attr('src')
		imageRatio = image.width() / image.height()
		asideRatio = aside.width() / aside.height()

		#console.log('W: ' + image.width() + ' - H: ' + image.height())
		
		# resize image
		if imageRatio > asideRatio
			#console.log('Width: ' + (aside.height() * imageRatio) + ' - Height: ' + aside.height())
			image.height(aside.height()).width(aside.height() * imageRatio)
		else
			#console.log('aside.width(): ' + aside.width())
			#console.log('imageRatio: ' + imageRatio)
			#console.log('Width: ' + aside.width() + ' - Height: ' + (aside.width() / imageRatio))
			image.width(aside.width()).height(aside.width() / imageRatio)

		# center image horizontally
		left = (aside.width() - image.width()) / 2
		image.css({
			position: 'absolute'
			top: 0
			left: left+'px'
		}).addClass('cover')
		
		true
		
	)

	true

###*
 * Activate fancybox
 *
 * @return {boolean} true
###
fancybox = ->
	if $("*").is(".jqfancybox")
		options =
			padding: 12
			speedIn: 300
			speedOut: 300
			changeSpeed: 300
			transitionIn: "elastic"
			transitionOut: "elastic"
			titlePosition: "over"
			titleShow: true
			easingIn: "swing"
			easingOut: "swing"
			showCloseButton: true
			showNavArrows: true
			enableEscapeButton: true
			overlayShow: true
			overlayOpacity: 0.4
			overlayColor: "#666"
			centerOnScroll: false
			hideOnContentClick: false
			onComplete: ->
				$("#fancybox-wrap").hover( ->
				  $("#fancybox-title").show()
					, ->
					$("#fancybox-title").hide()
				)
			titleFormat: (title, currentArray, currentIndex, currentOpts) ->
				'<span id="fancybox-title-over">' + ll[lang].image + ' ' + (currentIndex + 1) + ' ' + ll[lang].from + ' ' + currentArray.length + (if title.length then ': &nbsp; ' + title else '') + '</span>'

		$(".jqfancybox").fancybox( options )
		
	true

###*
 * Sets a new link for photo voting Lightbox
 *
 * @return {boolean} true
###
photovotingLinks = ->
  $('.tx_photovoting-singleVoting').each( ->
    lightboxLink = $(this).find('a.jqfancybox')
    hiddenBox = $(this).find('.invisible')
    lightboxLink.attr('href', hiddenBox.find('img').attr('src'))
    true
  )
  true

###*
 * Shows the words that could be typed
 *
 * @return {boolean} true
###
applicationFormValidation = ->
  # create
  $('#application textarea').each(->
    if $(this).attr('maxlength') > 0
      textarea = $(this)
      textarea.after('<p class="counter">noch <span></span> Zeichen verfügbar</p>')
      textCounter(textarea)

      textarea.keydown(->
        textCounter(textarea)
        true
      )
      textarea.keyup(->
        textCounter(textarea)
        true
      )
    true
  )
  true

textCounter = (el) ->
  number = el.attr('maxlength') - el.val().length
  el.next('p').children('span').text(number)

  true