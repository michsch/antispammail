# antiSpamMail

[![Build Status](https://api.travis-ci.org/michsch/antispammail.png?branch=master)](http://travis-ci.org/michsch/antispammail)
[![devDependency Status](https://david-dm.org/michsch/antispammail/dev-status.png)](https://david-dm.org/michsch/antispammail#info=devDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

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

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/michsch/antispammail/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
