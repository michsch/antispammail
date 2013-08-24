define [ 'antispammail' ], ( antiSpamMail ) ->
  ###*
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  ###
  antiSpamMail.encrypt = ( email ) ->
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

  antiSpamMail.encryptForm = ( formName, fieldName ) ->
    formName = formName or 'antiSpamMail'
    fieldName = fieldName or 'cryptmail_email'

    fieldShowEncryptedMail = 'cryptmail_cryptedmail'
    fieldShowEncryptedHtml = 'cryptmail_html'

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
      @encryptFn +
      '(\'' + encryptedMail + '\');">' +
      emailHtml +
      '</a>'

    true

  return
