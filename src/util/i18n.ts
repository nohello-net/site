import i18n from '../../vendor/eleventy-plugin-i18n-gettext/src/i18n';
import { marked } from 'marked';

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

  // TODO: do we need to use the locale? it defaults to gregorian calendar,
  // which is probably wrong in many cases. or is it "normal" by now?
  obj.currentYear = new Date().getFullYear().toString(10);

  return obj;
};

export default i18n;

export { enhance11tydata };
