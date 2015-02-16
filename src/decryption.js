define(['antispammail'], function(antiSpamMail) {

  /**
   * Uncrypt the email address and returns the valid href
   *
   * @method decrypt
   * @param {String} encryptedMail   the crypted string
   * @returns {String} valid href
   */
  antiSpamMail.decrypt = function(encryptedMail) {
    return this.encryptDecrypt(encryptedMail);
  };

  /**
   * Public function for A tags
   *
   * @method linkDecrypt
   * @param {String} encryptedMail   the crypted string
   * @returns void
   */
  antiSpamMail.linkDecrypt = function(encryptedMail) {
    location.href = this.decrypt(encryptedMail);
  };
});
