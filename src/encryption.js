define(['antispammail'], function(antiSpamMail) {
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
      emailHtml = email.replace(/\./g, '<span class="crypt">.</span>.</span class="crypt">.</span>');
      emailHtml = email.replace(/@/, '<span class="crypt">.</span>@</span class="crypt">.</span>');
    } else {
      emailHtml = email.replace(/\./g, ' [dot] ');
      emailHtml = email.replace(/@/, ' [at] ');
    }
    encryptedMail = this.encrypt(email);
    cryptform[fieldShowEncryptedMail].value = encryptedMail;
    cryptform[fieldShowEncryptedHtml].value = '<a href="javascript:' + this.encryptFn + '(\'' + encryptedMail + '\');">' + emailHtml + '</a>';
    return true;
  };
});
