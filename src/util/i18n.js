const i18n = require('eleventy-plugin-i18n-gettext');
const { marked } = require('marked');

console.log('i18n include');

// add [year]placeholder[/year] syntax
marked.use({
  extensions: [
    {
      name: 'year',
      start: (src) => src.match(/\[year\]/)?.index,
      level: 'inline',
      tokenizer: (src, tokens) => {
        const rule = /^\[year\]([^\n]*)\[\/year\]/;
        const match = rule.exec(src);

        if (match) {
          return {
            type: 'year',
            raw: match[0],
            text: match[1].trim(),
          };
        }
      },
      renderer: (token) => {
        return `<span class="year">${token.text}</span>\n`;
      },
    },
  ],
});

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
