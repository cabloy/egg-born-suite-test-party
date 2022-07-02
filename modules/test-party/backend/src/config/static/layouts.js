const layoutAtomListParty = require('./layout/layoutAtomListParty.js');
const layoutAtomItemParty = require('./layout/layoutAtomItemParty.js');
// const layoutAppMineParty = require('./layout/layoutAppMineParty.js');

module.exports = app => {
  const layouts = [
    //
    layoutAtomListParty(app),
    layoutAtomItemParty(app),
    // layoutAppMineParty(app),
  ];
  return layouts;
};
