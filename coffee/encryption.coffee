define ['antispammail'], (antiSpamMail) ->
  ###*
  # Crypt given mail
  #
  # @method encrypt
  # @param {String} emailToEncrypt  email address to encrypt
  # @returns {String} encrypted email address
  ###
  antiSpamMail.encrypt = (emailToEncrypt) ->
    @encryptDecrypt 'mailto:' + emailToEncrypt, 1

  ###*
  # Initiate the form to encrypt
  #
  # @method encryptForm
  # @param {String} formName    the name of the form
  # @param {String} fieldName   name of email field
  # @returns void
  ###
  antiSpamMail.encryptForm = (formName, fieldName) ->
    formName = formName or 'antiSpamMail'
    fieldName = fieldName or 'cryptmail_email'

    fieldShowEncryptedMail = 'cryptmail_cryptedmail'
    fieldShowEncryptedHtml = 'cryptmail_html'

    cryptform = document.forms[formName]
    email = cryptform[fieldName].value

    if cryptform.cryptmail_email.value.length < 4
      return false

    radioObj = cryptform.cryptmail_radio
    if radioObj.length > 0
      i = 0
      while i < radioObj.length
        radioValue = parseInt(radioObj[i].value if radioObj[i].checked, 10)
        i++
    else
      radioValue = 0

    if radioValue is 1
      emailHtml = email.replace(
        /\./g,
        '<span class="crypt" aria-hidden="true">.</span>.<span class="crypt" aria-hidden="true">.</span>'
      )
      emailHtml = emailHtml.replace(
        /@/,
        '<span class="crypt" aria-hidden="true">.</span>@<span class="crypt" aria-hidden="true">.</span>'
      )
    else
      emailHtml = email.replace /\./g, ' [dot] '
      emailHtml = emailHtml.replace /@/, ' [at] '

    encryptedMail = @encrypt email

    cryptform[fieldShowEncryptedMail].value = encryptedMail
    cryptform[fieldShowEncryptedHtml].value = '<a href="javascript:' +
      @encryptFn +
      '(\'' + encryptedMail + '\');">' +
      emailHtml +
      '</a>'

    return

  return
