define ['antispammail'], (antiSpamMail) ->
  ###*
  # Uncrypt the email address and returns the valid href
  #
  # @method decrypt
  # @param {String} encryptedMail   the crypted string
  # @returns {String} valid href
  ###
  antiSpamMail.decrypt = (encryptedMail) ->
    @encryptDecrypt(encryptedMail)

  ###*
  # Public function for A tags
  #
  # @method linkDecrypt
  # @param {String} encryptedMail   the crypted string
  # @returns void
  ###
  antiSpamMail.linkDecrypt = (encryptedMail) ->
    location.href = @decrypt encryptedMail
    return

  return
