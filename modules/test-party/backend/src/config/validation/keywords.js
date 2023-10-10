const languages = require('./keyword/languages.js');

function appendPrefix(keywords) {
  const result = {};
  for (const key in keywords) {
    if (key.indexOf('x-') === 0) {
      result[key] = keywords[key];
    } else {
      result[`x-${key}`] = keywords[key];
    }
  }
  return result;
}

module.exports = app => {
  const keywords = {};
  // product
  Object.assign(keywords, appendPrefix(languages(app)));
  // ok
  return keywords;
};
