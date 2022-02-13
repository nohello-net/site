const i18n = require('../../i18n-wrapper');

module.exports = () => {
  const customData = {
    eatSnails: true,
  };

  return i18n.enhance11tydata(customData, 'fr-fr');
};
