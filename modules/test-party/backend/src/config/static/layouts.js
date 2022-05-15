const layoutAtomListParty = require('./layout/layoutAtomListParty.js');
const layoutAppMineParty = require('./layout/layoutAppMineParty.js');

module.exports = app => {
  const layouts = [
    //
    layoutAtomListParty(app),
    layoutAppMineParty(app),
  ];
  return layouts;
};
