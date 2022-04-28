const party = require('./model/party.js');

module.exports = app => {
  const models = {};
  Object.assign(models, {
    party,
  });
  return models;
};
