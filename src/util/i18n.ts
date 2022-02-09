const i18n = require('eleventy-plugin-i18n-gettext');
const { marked } = require('marked');

// add [year]placeholder[/year] syntax
marked.use({
  extensions: [
    {
      name: 'year',
      start: (src) => src.match(/\[year\]/)?.index,
      level: 'inline',
      tokenizer: (src) => {
        const rule = /^\[year\]([^\n]*)\[\/year\]/;
        const match = rule.exec(src);

        if (match) {
          return {
            type: 'year',
            raw: match[0],
            text: match[1].trim(),
          };
        }

        return null;
      },
      renderer: (token) => {
        return `<span class="year">${token.text}</span>\n`;
      },
    },
  ],
});

const enhance11tydata = (objArg, localeArg, dir = 'ltr') => {
  const obj = i18n.enhance11tydata(objArg, localeArg, dir);
  const { locale } = obj; // this gets normalised in `enhance11tydata`

  // markdown: inline mode
  // eslint-disable-next-line no-underscore-dangle
  obj._md = (key, ...args) => {
    return marked.parseInline(i18n._(locale, key, ...args));
  };

  // markdown: "paragraph" mode
  // eslint-disable-next-line no-underscore-dangle
  obj._mdp = (key, ...args) => {
    return marked.parse(i18n._(locale, key, ...args));
  };

  return obj;
};

module.exports = {
  enhance11tydata,
};
