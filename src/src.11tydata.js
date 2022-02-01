'use strict';

const i18n = require('./util/i18n');
const locales = require('./_data/locales.json');

module.exports = () => {
  // the root page is using the layout for all the site metadata, so better localise it
  // XXX: should we use a custom minimal page for root page? any impacts on SEO?
  return i18n.enhance11tydata({}, locales[0].path);
};
