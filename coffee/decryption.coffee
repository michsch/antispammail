define ['antispammail'], (antiSpamMail) ->
  ###*
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  ###
  antiSpamMail.decrypt = (encryptedMail) ->
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
  antiSpamMail.linkDecrypt = (encryptedMail) ->
    location.href = @decrypt encryptedMail
    true

  return
