const appParty = require('./app/appParty.js');
const appComponents = require('./app/appComponents.js');

module.exports = app => {
  const apps = [
    //
    appParty(app),
    appComponents(app),
  ];
  return apps;
};
