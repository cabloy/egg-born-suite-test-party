const partyExpense = require('./schema/partyExpense.js');
const blocks = require('./schema/blocks.js');
const formTest = require('./schema/formTest.js');
const party = require('./schema/party.js');
const partyOverBulk = require('./schema/partyOverBulk.js');
const settings = require('./schema/settings.js');

module.exports = app => {
  const schemas = {};
  // partyExpense
  Object.assign(schemas, partyExpense(app));
  // blocks
  Object.assign(schemas, blocks(app));
  // formTest
  Object.assign(schemas, formTest(app));
  // party
  Object.assign(schemas, party(app));
  // partyOver
  Object.assign(schemas, partyOverBulk(app));
  // settings
  Object.assign(schemas, settings(app));
  // ok
  return schemas;
};
