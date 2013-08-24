define [], () ->

  AntiSpamMail = () ->

  AntiSpamMailProto =
    # Don't change the version here! Use Grunt task "version" instead!
    _version: '0.0.1'
    encryptFn: 'antiSpamMail.linkDecrypt'

  AntiSpamMail.prototype = AntiSpamMailProto

  window.antiSpamMail = antiSpamMail = new AntiSpamMail()

  return
