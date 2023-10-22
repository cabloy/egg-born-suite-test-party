const partyType = require('./dict/partyType.js');

module.exports = app => {
  const dicts = [
    partyType(app), //
  ];
  return dicts;
};
