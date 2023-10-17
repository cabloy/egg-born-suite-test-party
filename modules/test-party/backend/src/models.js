const partyExpense = require('./model/partyExpense.js');
const party = require('./model/party.js');

module.exports = app => {
  const models = { partyExpense };
  Object.assign(models, {
    party,
  });
  return models;
};
