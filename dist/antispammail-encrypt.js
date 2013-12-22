/*!
 * antiSpamMail - v0.1.0 - 2013-12-22
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
    _version: '0.1.0',
    encryptFn: 'antiSpamMail.linkDecrypt'
  };
  AntiSpamMail.prototype = AntiSpamMailProto;
  window.antiSpamMail = antiSpamMail = new AntiSpamMail();


  /**
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  */

  antiSpamMail.encrypt = function(email) {
    var encryptedMail, i, mailtoEmail, n;
    n = 0;
    encryptedMail = '';
    mailtoEmail = 'mailto:' + email;
    i = 0;
    while (i < mailtoEmail.length) {
      n = mailtoEmail.charCodeAt(i);
      if (n >= 8364) {
        n = 128;
      }
      encryptedMail += String.fromCharCode(n + 1);
      i++;
    }
    return encryptedMail;
  };
  antiSpamMail.encryptForm = function(formName, fieldName) {
    var cryptform, email, emailHtml, encryptedMail, fieldShowEncryptedHtml, fieldShowEncryptedMail, i, radioObj, radioValue;
    formName = formName || 'antiSpamMail';
    fieldName = fieldName || 'cryptmail_email';
    fieldShowEncryptedMail = 'cryptmail_cryptedmail';
    fieldShowEncryptedHtml = 'cryptmail_html';
    cryptform = document.forms[formName];
    email = cryptform[fieldName].value;
    if (cryptform.cryptmail_email.value.length < 4) {
      return false;
    }
    radioObj = cryptform.cryptmail_radio;
    if (radioObj.length > 0) {
      i = 0;
      while (i < radioObj.length) {
        radioValue = parseInt(radioObj[i].checked ? radioObj[i].value : void 0, 10);
        i++;
      }
    } else {
      radioValue = 0;
    }
    if (radioValue === 1) {
      emailHtml = email.replace(/\./g, '<span class="crypt" aria-hidden="true">.</span>.<span class="crypt" aria-hidden="true">.</span>');
      emailHtml = emailHtml.replace(/@/, '<span class="crypt" aria-hidden="true">.</span>@<span class="crypt" aria-hidden="true">.</span>');
    } else {
      emailHtml = email.replace(/\./g, ' [dot] ');
      emailHtml = emailHtml.replace(/@/, ' [at] ');
    }
    encryptedMail = this.encrypt(email);
    cryptform[fieldShowEncryptedMail].value = encryptedMail;
    cryptform[fieldShowEncryptedHtml].value = '<a href="javascript:' + this.encryptFn + '(\'' + encryptedMail + '\');">' + emailHtml + '</a>';
    return true;
  };


  if (typeof define === 'function' && define.amd) {
    define('antiSpamMail', [], function() { return antiSpamMail; });
  }
})(this, document);