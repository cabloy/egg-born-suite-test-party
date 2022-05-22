const appTest = require('./app/appTest.js');

module.exports = app => {
  const apps = [
    //
    appTest(app),
  ];
  return apps;
};
