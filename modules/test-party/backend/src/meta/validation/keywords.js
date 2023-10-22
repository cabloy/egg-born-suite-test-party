const languages = require('./keyword/languages.js');

module.exports = app => {
  const keywords = {};
  // product
  Object.assign(keywords, languages(app));
  // ok
  return keywords;
};
