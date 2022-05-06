const layoutAtomListParty = require('./layout/layoutAtomListParty.js');

module.exports = app => {
  const layouts = [layoutAtomListParty(app)];
  return layouts;
};
