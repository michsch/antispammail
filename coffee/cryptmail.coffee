###*
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
      e = e.replace(/@/, '<span class="crypt">.</span>@</span class="crypt">.</span>')
      e = e.replace(/\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>')
    else
      e = e.replace(/@/, ' [at] ')
      e = e.replace(/\./g, ' [dot] ')
    
    i = 0
    while i < s.length
      n = s.charCodeAt(i)
      n = 128  if n >= 8364
      r += String.fromCharCode(n + 1)
      i++
    cryptform.cryptmail_cryptedmail.value = r
    cryptform.cryptmail_html.value = '<a href="javascript:linkTo_UnCryptMailto(\'' + r + '\');">' + "\n\t" + e + "\n" + '</a>'
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
   * Public function for A tags
   *
   * @param string the crypted string
   * @return boolean true
  ###
  window.linkTo_UnCryptMailto = (s) ->
    location.href = UnCryptMailto(s)
    true
  
  true

) window