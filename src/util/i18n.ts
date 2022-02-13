import i18n from '../../vendor/eleventy-plugin-i18n-gettext/src/i18n';
import { marked } from 'marked';

// add [year]placeholder[/year] syntax
marked.use({
  extensions: [
    {
      name: 'year',
      start: (src) => src.match(/\[year\]/)?.index ?? 0,
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
      },
      renderer: (token) => {
        return `<span class="year">${token.text}</span>\n`;
      },
    },
  ],
});

const enhance11tydata = (objArg: any, localeArg: string, dir = 'ltr') => {
  const obj = i18n.enhance11tydata(objArg, localeArg, dir);
  const { locale } = obj; // this gets normalised in `enhance11tydata`

  // markdown: inline mode
  // eslint-disable-next-line no-underscore-dangle
  obj._md = (key: string, ...args: string[]) => {
    return marked.parseInline(i18n._(locale, key, ...args));
  };

  // markdown: "paragraph" mode
  // eslint-disable-next-line no-underscore-dangle
  obj._mdp = (key: string, ...args: string[]) => {
    return marked.parse(i18n._(locale, key, ...args));
  };

  return obj;
};

export default i18n;

export { enhance11tydata };
