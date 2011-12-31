/**
 * JavaScript email encrypter
 *
 * @author             Michael Schulze
 * @version            $1.0$
 * @copyright          Michael Schulze, 31 December, 2011
 * @license            GNU General Public License, version 3 (GPL-3.0)
 * @package            coffeescript
 *
 * @lastmodified       $Date: 2011-12-31 20:29:35  +0100 (Sat, 31 Dec 2011) $
 *
*/

(function(window) {
  /**
   * Crypt given mail
   *
   * @param string email address
   * @param boolean true
  */
  var UnCryptMailto;
  window.CryptMailto = function() {
    var cryptform, e, formname, i, n, r, radioObj, radioValue, s;
    formname = 'cryptmail';
    cryptform = document.forms[formname];
    n = 0;
    r = "";
    s = "mailto:" + cryptform.cryptmail_email.value;
    e = cryptform.cryptmail_email.value;
    if (cryptform.cryptmail_email.value.length < 4) return false;
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
      if (n >= 8364) n = 128;
      r += String.fromCharCode(n + 1);
      i++;
    }
    cryptform.cryptmail_cryptedmail.value = r;
    cryptform.cryptmail_html.value = '<a href="javascript:linkTo_UnCryptMailto(\'' + r + '\');">' + "\n\t" + e + "\n" + '</a>';
    return true;
  };
  /**
   * Uncrypt the email address and returns the valid href
   *
   * @param string the crypted string
   * @return string valid href
  */
  UnCryptMailto = function(s) {
    var i, n, r;
    n = 0;
    r = "";
    i = 0;
    while (i < s.length) {
      n = s.charCodeAt(i);
      if (n >= 8364) n = 128;
      r += String.fromCharCode(n - 1);
      i++;
    }
    return r;
  };
  /**
   * Public function for A tags
   *
   * @param string the crypted string
   * @return boolean true
  */
  window.linkTo_UnCryptMailto = function(s) {
    location.href = UnCryptMailto(s);
    return true;
  };
  return true;
})(window);