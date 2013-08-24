###*
 * JavaScript email encrypter
 *
 * @author             Michael Schulze
 * @version            $0.1.0$
 * @copyright          Michael Schulze, 31 December, 2011
 * @license            GNU General Public License, version 3 (GPL-3.0)
 * @package            coffeescript
 * @url                http://michsch.github.com/cryptmail/
 *
 * @lastmodified       $Date: 2013-08-24 15:40:04 +0200 (Sat, 24 Aug 2013) $
 *
###

( (window) ->

  ###*
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  ###
  window.CryptMailto = ->
    formname = 'cryptmail'
    cryptform = document.forms[formname]
    n = 0
    r = ""
    s = "mailto:" + cryptform.cryptmail_email.value
    e = cryptform.cryptmail_email.value

    if cryptform.cryptmail_email.value.length < 4
      return false

    radioObj = cryptform.cryptmail_radio
    if radioObj.length > 0
      i = 0
      while i < radioObj.length
        radioValue = parseInt(radioObj[i].value if radioObj[i].checked, 0)
        i++
    else
      radioValue = 0

    if radioValue is 1
      e = e.replace(/\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>')
      e = e.replace(/@/, '<span class="crypt">.</span>@</span class="crypt">.</span>')
    else
      e = e.replace(/\./g, ' [dot] ')
      e = e.replace(/@/, ' [at] ')

    i = 0
    while i < s.length
      n = s.charCodeAt(i)
      n = 128  if n >= 8364
      r += String.fromCharCode(n + 1)
      i++
    cryptform.cryptmail_cryptedmail.value = r
    cryptform.cryptmail_html.value = '<a href="javascript:linkTo_UnCryptMailto(\'' + r + '\');">' + e + '</a>'
    true

  ###*
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  ###
  unCryptMailto = (s) ->
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
   * Public function for A tags
   *
   * @param string the crypted string
   * @return boolean true
  ###
  window.linkTo_UnCryptMailto = (s) ->
    location.href = unCryptMailto(s)
    true

  true

) window
