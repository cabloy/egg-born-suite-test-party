const layoutTest = require('./layout/layoutTest.js');
const layoutAppMenuTest = require('./layout/layoutAppMenuTest.js');

module.exports = app => {
  const layouts = [
    //
    layoutTest(app),
    layoutAppMenuTest(app),
  ];
  return layouts;
};
