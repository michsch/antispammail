/*!
 * antiSpamMail - v0.0.1 - 2013-09-18
 * Copyright (c) 2013 Michael Schulze
 * MIT license */
 
/*
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER.
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;(function(window, document, undefined){
  'use strict';

  var AntiSpamMail, AntiSpamMailProto, antiSpamMail;
  AntiSpamMail = function() {};
  AntiSpamMailProto = {
    _version: '0.0.1',
    encryptFn: 'antiSpamMail.linkDecrypt'
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
