# antiSpamMail

[![Release](http://img.shields.io/github/release/michsch/antispammail.svg?style=flat)](https://github.com/michsch/antispammail/releases)
[![Issues](http://img.shields.io/github/issues/michsch/antispammail.svg?style=flat)](https://github.com/michsch/antispammail/issues)

---

[![Build Status](http://img.shields.io/travis/michsch/antispammail/master.svg?style=flat)](https://travis-ci.org/michsch/antispammail)
[![Code Climate](http://img.shields.io/codeclimate/github/michsch/antispammail.svg?style=flat)](https://codeclimate.com/github/michsch/antispammail)
[![devDependency Status](http://img.shields.io/david/dev/michsch/antispammail.svg?style=flat)](https://david-dm.org/michsch/antispammail#info=devDependencies)
[![Built with Grunt](http://img.shields.io/badge/built_with-grunt-yellow.svg?style=flat)](http://gruntjs.com/)

## How to use

Just include the **antispammail.js** file in your documents header or just before the closing body tag. If you use the span Tags with classname ``crypt`` than you should load the CSS file too or copy the styles inside your stylesheet.

If you only want to use the script for decrypting you don't have to load the complete version. Just use **antispammail-decrypt.js** instead.

[Encrypt your email here!](http://michsch.github.io/antispammail/)

### Examples

#### HTML with normal mailto link

``` html
<a href="mailto:my@email.com">
  my@email.com
</a>
```

#### HTML with easy encryption (no CSS needed)

``` html
<a href="javascript:antiSpamMail.linkDecrypt('nbjmup;nzAfnbjm/dpn');">
  my [at] email [dot] com
</a>
```

``` html
<a href="javascript:antiSpamMail.linkDecrypt('nbjmup;nzAfnbjm/dpn');">
  Write me an email!
</a>
```

#### HTML with advanced encryption (CSS needed to hide dots)

``` html
<a href="javascript:antiSpamMail.linkDecrypt('nbjmup;nzAfnbjm/dpn');">
  my<span class="crypt" aria-hidden="true">.</span>@<span class="crypt" aria-hidden="true">.</span>email<span class="crypt" aria-hidden="true">.</span>.<span class="crypt" aria-hidden="true">.</span>com
</a>
```

### CSS for advanced encryption

I use the [image replacement method by Nicolas Gallagher](http://nicolasgallagher.com/another-css-image-replacement-technique/ "Website of Nicolas Gallagher"):

``` css
.crypt {
  font: 0/0 a;
  text-shadow: none;
  color: transparent;
  border: 0;
  background-color: transparent;
}
```

## License

Please be aware of the licenses of each component we use in this project. Everything else that has been developed by the contributions to this project is under [MIT License](https://github.com/michsch/antispammail/blob/master/LICENSE.md).

[![Made with love in cologne](http://img.shields.io/badge/made_with_love_in-cologne-red.svg?style=flat)](http://en.wikipedia.org/wiki/Cologne)
