const dashboardTest = require('./dashboard/dashboardTest.js');
const homeTest = require('./dashboard/homeTest.js');

module.exports = app => {
  const dashboards = [
    dashboardTest(app), //
    homeTest(app),
  ];
  return dashboards;
};
