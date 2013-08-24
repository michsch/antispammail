/*! antiSpamMail - v0.1.0 - 2013-08-24
* Copyright (c) 2013 Michael Schulze; Licensed MIT license */

;(function(window, document, undefined){
  'use strict';

  var AntiSpamMail, AntiSpamMailProto, antiSpamMail;
  AntiSpamMail = function() {};
  AntiSpamMailProto = {
    _version: '0.1.0',
    encryptFn: 'antiSpamMail.decrypt'
  };
  AntiSpamMail.prototype = AntiSpamMailProto;
  window.antiSpamMail = antiSpamMail = new AntiSpamMail();


  /**
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  */

  antiSpamMail.decrypt = function(encryptedMail) {
    var email, i, n;
    n = 0;
    email = '';
    i = 0;
    while (i < encryptedMail.length) {
      n = encryptedMail.charCodeAt(i);
      if (n >= 8364) {
        n = 128;
      }
      email += String.fromCharCode(n - 1);
      i++;
    }
    return email;
  };
  /**
   * Public function for A tags
   *
   * @param string the crypted string
   * @return boolean true
  */

  antiSpamMail.linkDecrypt = function(encryptedMail) {
    location.href = this.decrypt(encryptedMail);
    return true;
  };


  if (typeof define === 'function' && define.amd) {
    define('antiSpamMail', [], function() { return antiSpamMail; });
  }
})(this, document);
