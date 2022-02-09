import { enhance11tydata } from './util/i18n';
import locales from './_data/locales.json';

module.exports = () => {
  // the root page is using the layout for all the site metadata, so better localise it
  // XXX: should we use a custom minimal page for root page? any impacts on SEO?
  return enhance11tydata({}, locales[0].path);
};
