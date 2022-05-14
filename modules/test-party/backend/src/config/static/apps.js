const appParty = require('./app/appParty.js');

module.exports = app => {
  const apps = [
    //
    appParty(app),
  ];
  return apps;
};
