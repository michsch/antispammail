define [], () ->
  AntiSpamMail = () ->

  AntiSpamMail.fn = AntiSpamMail.prototype =
    # Don't change the version here! Use Grunt task "version" instead!
    _version: '0.1.5'
    encryptFn: 'antiSpamMail.linkDecrypt'

    ###*
    # Encrypt or decrypt a string
    #
    # @method encryptDecrypt
    # @param {String} originalString      string to encrypt or decrypt
    # @param {Number} [nFromCharCode=-1]  encrypt if +1, decrypt if -1
    # @returns {String} encrypted or decrypted string
    ###
    encryptDecrypt: (originalString, nFromCharCode = -1) ->
      i = 0
      n = 0
      newString = ''

      while i < originalString.length
        n = originalString.charCodeAt i
        n = 128  if n >= 8364
        newString += String.fromCharCode n + nFromCharCode
        i++

      newString

  antiSpamMail = new AntiSpamMail()

  return
