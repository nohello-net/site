'use strict';

const i18n = require('eleventy-plugin-i18n-gettext');

module.exports = () => {
  return i18n.enhance11tydata({}, 'de');
};
