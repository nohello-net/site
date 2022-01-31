const i18n = require('eleventy-plugin-i18n-gettext');
const { marked } = require('marked');

const enhance11tydata = (obj, locale, dir = 'ltr') => {
  obj = i18n.enhance11tydata(obj, locale, dir);
  locale = obj.locale; // this gets normalised in `enhance11tydata`

  // markdown: inline mode
  obj._md = (key, ...args) => {
    return marked.parseInline(i18n._(locale, key, ...args));
  };

  // markdown: "paragraph" mode
  obj._mdp = (key, ...args) => {
    return marked.parse(i18n._(locale, key, ...args));
  };

  return obj;
};

module.exports = {
  enhance11tydata,
};
