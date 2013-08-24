define(['antispammail'], function(antiSpamMail) {
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
});
