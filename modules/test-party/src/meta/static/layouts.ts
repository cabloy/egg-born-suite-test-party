const layoutAtomListPartyExpense = require('./layout/layoutAtomListPartyExpense.js');
const layoutAtomListParty = require('./layout/layoutAtomListParty.js');
const layoutAtomItemParty = require('./layout/layoutAtomItemParty.js');
// const layoutAppMineParty = require('./layout/layoutAppMineParty.js');

const layouts = [
  layoutAtomListPartyExpense,
  //
  layoutAtomListParty, // layoutAppMineParty,
  layoutAtomItemParty,
];
export default layouts;
