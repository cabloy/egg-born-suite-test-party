const partyExpense = require('./schema/partyExpense.js');
const blocks = require('./schema/blocks.js');
const formTest = require('./schema/formTest.js');
const party = require('./schema/party.js');
const partyOverBulk = require('./schema/partyOverBulk.js');
const settings = require('./schema/settings.js');

const schemas = {};
// partyExpense
Object.assign(schemas, partyExpense);
// blocks
Object.assign(schemas, blocks);
// formTest
Object.assign(schemas, formTest);
// party
Object.assign(schemas, party);
// partyOver
Object.assign(schemas, partyOverBulk);
// settings
Object.assign(schemas, settings);
// ok
module.exports = schemas;
