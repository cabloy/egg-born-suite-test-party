// const layoutAtomListPartyExpense = require('./layout/layoutAtomListPartyExpense.js');
const layoutAtomListParty = require('./layout/layoutAtomListParty.js');
const layoutAtomItemParty = require('./layout/layoutAtomItemParty.js');
// const layoutAppMineParty = require('./layout/layoutAppMineParty.js');

module.exports = app => {
  const layouts = [
    // layoutAtomListPartyExpense(app),
    //
    layoutAtomListParty(app), // layoutAppMineParty(app),
    layoutAtomItemParty(app),
  ];
  return layouts;
};
