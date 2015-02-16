define([], function() {
  var AntiSpamMail, antiSpamMail;
  AntiSpamMail = function() {};
  AntiSpamMail.fn = AntiSpamMail.prototype = {
    _version: '0.1.5',
    encryptFn: 'antiSpamMail.linkDecrypt',

    /**
     * Encrypt or decrypt a string
     *
     * @method encryptDecrypt
     * @param {String} originalString      string to encrypt or decrypt
     * @param {Number} [nFromCharCode=-1]  encrypt if +1, decrypt if -1
     * @returns {String} encrypted or decrypted string
     */
    encryptDecrypt: function(originalString, nFromCharCode) {
      var i, n, newString;
      if (nFromCharCode == null) {
        nFromCharCode = -1;
      }
      i = 0;
      n = 0;
      newString = '';
      while (i < originalString.length) {
        n = originalString.charCodeAt(i);
        if (n >= 8364) {
          n = 128;
        }
        newString += String.fromCharCode(n + nFromCharCode);
        i++;
      }
      return newString;
    }
  };
  antiSpamMail = new AntiSpamMail();
});
