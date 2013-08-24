/**
 * JavaScript email encrypter
 *
 * @author             Michael Schulze
 * @version            $0.1.0$
 * @copyright          Michael Schulze, 31 December, 2011
 * @license            GNU General Public License, version 3 (GPL-3.0)
 * @package            coffeescript
 * @url                http://michsch.github.com/cryptmail/
 *
 * @lastmodified       $Date: 2013-08-24 15:40:04 +0200 (Sat, 24 Aug 2013) $
 *
*/

(function(exports, root, document) {
  "use strict";
  /**
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  */

  exports.cryptMail = function() {
    var cryptform, e, formname, i, n, r, radioObj, radioValue, s;
    formname = 'cryptmail';
    cryptform = document.forms[formname];
    n = 0;
    r = "";
    s = "mailto:" + cryptform.cryptmail_email.value;
    e = cryptform.cryptmail_email.value;
    if (cryptform.cryptmail_email.value.length < 4) {
      return false;
    }
    radioObj = cryptform.cryptmail_radio;
    if (radioObj.length > 0) {
      i = 0;
      while (i < radioObj.length) {
        radioValue = parseInt(radioObj[i].checked ? radioObj[i].value : void 0, 0);
        i++;
      }
    } else {
      radioValue = 0;
    }
    if (radioValue === 1) {
      e = e.replace(/\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>');
      e = e.replace(/@/, '<span class="crypt">.</span>@</span class="crypt">.</span>');
    } else {
      e = e.replace(/\./g, ' [dot] ');
      e = e.replace(/@/, ' [at] ');
    }
    i = 0;
    while (i < s.length) {
      n = s.charCodeAt(i);
      if (n >= 8364) {
        n = 128;
      }
      r += String.fromCharCode(n + 1);
      i++;
    }
    cryptform.cryptmail_cryptedmail.value = r;
    cryptform.cryptmail_html.value = '<a href="javascript:linkTo_UnCryptMailto(\'' + r + '\');">' + e + '</a>';
    return true;
  };
  exports.encrypt = function(email) {
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
  exports.encryptForm = function(formName, fieldName) {
    var cryptform, email, emailHtml, encryptFunctionName, encryptedMail, fieldShowEncryptedHtml, fieldShowEncryptedMail, i, radioObj, radioValue;
    formName = formName || 'antiSpamMail';
    fieldName = fieldName || 'cryptmail_email';
    fieldShowEncryptedMail = 'cryptmail_cryptedmail';
    fieldShowEncryptedHtml = 'cryptmail_html';
    encryptFunctionName = 'antiSpamMail.decrypt';
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
      emailHtml = email.replace(/\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>');
      emailHtml = email.replace(/@/, '<span class="crypt">.</span>@</span class="crypt">.</span>');
    } else {
      emailHtml = email.replace(/\./g, ' [dot] ');
      emailHtml = email.replace(/@/, ' [at] ');
    }
    encryptedMail = this.encrypt(email);
    cryptform[fieldShowEncryptedMail].value = encryptedMail;
    cryptform[fieldShowEncryptedHtml].value = '<a href="javascript:' + encryptFunctionName + '(\'' + encryptedMail + '\');">' + emailHtml + '</a>';
    return true;
  };
  /**
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  */

  exports.decrypt = function(encryptedMail) {
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

  exports.linkToMailTo = function(encryptedMail) {
    location.href = this.decrypt(encryptedMail);
    return true;
  };
})(window.antiSpamMail = window.antiSpamMail || {}, (typeof window === 'object' && window) || this, document);
