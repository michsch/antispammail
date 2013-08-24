define([], function() {
  var AntiSpamMail, AntiSpamMailProto, antiSpamMail;
  AntiSpamMail = function() {};
  AntiSpamMailProto = {
    _version: '0.1.0',
    encryptFn: 'antiSpamMail.decrypt'
  };
  AntiSpamMail.prototype = AntiSpamMailProto;
  window.antiSpamMail = antiSpamMail = new AntiSpamMail();
});
