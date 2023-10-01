const party = require('./atomClass/party.js');

module.exports = app => {
  const atomClasses = {
    //
    party: party(app),
  };
  return atomClasses;
};
