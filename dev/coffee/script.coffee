###*
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
###

jQuery.noConflict()

$ = jQuery

language = 'de'
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
 * @return boolean true
###
init = ->
 	$.accessifyhtml5()
		$('html').removeClass('no-js').addClass('js')
		
		mobileScrollUp = -> window.scrollTo(0, 1)
		setTimeout mobileScrollUp,100

		# Functions
    prettyPrint()

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
 * @param integer width of window in pixel
 * @param boolean true if window is resized
 *
 * @return boolean true
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
 * @param object jQuery object
 * @return integer window width in pixel
###
getWindowWidth = ->
	windowWidth = window.innerWidth
	if !windowWidth
		ielt9 = true
		windowWidth = $('body').width()
	windowWidth

###
 * Fancybox popup
 *
 * @return boolean true
###
fancyboxMore = ->
  if $('*').is('a.jqfancybox-more')
    $('a.jqfancybox-more').click( (event) ->
      event.preventDefault()
      content = $($(this).attr('href')).html()
      $.fancybox(
        content
        {
          autoDimensions	: true
          width      		  : 600
          padding         : 40
          height     	  	: 'auto'
          transitionIn		: 'none'
          transitionOut		: 'none'
        }
      )
    )
  true

###*
 * Activate fancybox
 *
 * @return boolean true
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