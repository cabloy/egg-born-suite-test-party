const partyExpense = require('./atomClass/partyExpense.js');
const party = require('./atomClass/party.js');

module.exports = app => {
  const atomClasses = {
    partyExpense: partyExpense(app),
    //
    party: party(app),
  };
  return atomClasses;
};
