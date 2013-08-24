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

( ( exports, root, document ) ->
  "use strict"

  ###*
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  ###
  exports.cryptMail = () ->
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

  exports.encrypt = ( email ) ->
    n = 0
    encryptedMail = ''
    mailtoEmail = 'mailto:' + email

    i = 0
    while i < mailtoEmail.length
      n = mailtoEmail.charCodeAt(i)
      n = 128  if n >= 8364
      encryptedMail += String.fromCharCode(n + 1)
      i++
    encryptedMail

  exports.encryptForm = ( formName, fieldName ) ->
    formName = formName or 'antiSpamMail'
    fieldName = fieldName or 'cryptmail_email'

    fieldShowEncryptedMail = 'cryptmail_cryptedmail'
    fieldShowEncryptedHtml = 'cryptmail_html'

    encryptFunctionName = 'antiSpamMail.decrypt'

    cryptform = document.forms[ formName ]
    email = cryptform[ fieldName ].value

    if cryptform.cryptmail_email.value.length < 4
      return false

    radioObj = cryptform.cryptmail_radio
    if radioObj.length > 0
      i = 0
      while i < radioObj.length
        radioValue = parseInt( radioObj[i].value if radioObj[i].checked, 10)
        i++
    else
      radioValue = 0

    if radioValue is 1
      emailHtml = email.replace /\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>'
      emailHtml = email.replace /@/, '<span class="crypt">.</span>@</span class="crypt">.</span>'
    else
      emailHtml = email.replace /\./g, ' [dot] '
      emailHtml = email.replace /@/, ' [at] '

    encryptedMail = @encrypt email

    cryptform[ fieldShowEncryptedMail ].value = encryptedMail
    cryptform[ fieldShowEncryptedHtml ].value = '<a href="javascript:' +
      encryptFunctionName +
      '(\'' + encryptedMail + '\');">' +
      emailHtml +
      '</a>'

    true
  ###*
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  ###
  exports.decrypt = ( encryptedMail ) ->
    n = 0
    email = ''
    i = 0

    while i < encryptedMail.length
      n = encryptedMail.charCodeAt i
      n = 128  if n >= 8364
      email += String.fromCharCode n - 1
      i++
    email

  ###*
   * Public function for A tags
   *
   * @param string the crypted string
   * @return boolean true
  ###
  exports.linkToMailTo = ( encryptedMail ) ->
    location.href = @decrypt encryptedMail
    true

  return
) window.antiSpamMail = window.antiSpamMail or {}, ( typeof window is 'object' and window ) or @, document
