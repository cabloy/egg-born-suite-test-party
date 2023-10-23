const partyStatus = require('./dict/partyStatus.js');
const partyType = require('./dict/partyType.js');

module.exports = app => {
  const dicts = [
    partyStatus(app), //
    partyType(app),
  ];
  return dicts;
};
