###*
 * JavaScript email encrypter
 *
 * @author             Michael Schulze
 * @version            $1.0$
 * @copyright          Michael Schulze, 31 December, 2011
 * @license            All rights reserved. No usage without written permission.
 * @package            coffeescript
 * @requirements       jquery-1.7.1.min.js
 *
 * @lastmodified       $Date: 2011-12-31 20:29:35  +0100 (Sat, 31 Dec 2011) $
 *
###

( (window) ->

  ###*
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  ###
  CryptMailto = ->
    n = 0
    r = ""
    s = "mailto:" + document.forms[0].emailField.value
    e = document.forms[0].emailField.value
    e = e.replace(/@/, " [at] ")
    e = e.replace(/\./g, " [dot] ")
    i = 0

    while i < s.length
      n = s.charCodeAt(i)
      n = 128  if n >= 8364
      r += String.fromCharCode(n + 1)
      i++
    document.forms[0].cyptedEmailField.value = r
    document.forms[0].HTMLCyptedEmailField.value = "<a href=\"javascript:linkTo_UnCryptMailto('" + r + "');\">" + e + "</a>"
    true

  ###*
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  ###
  UnCryptMailto = (s) ->
    n = 0
    r = ""
    i = 0

    while i < s.length
      n = s.charCodeAt(i)
      n = 128  if n >= 8364
      r += String.fromCharCode(n - 1)
      i++
    r

  ###*
   * Public function for a tags
   *
   * @param string the crypted string
   * @return boolean true
  ###
  window.linkTo_UnCryptMailto = (s) ->
    location.href = UnCryptMailto(s)
    true
  
  true

) window