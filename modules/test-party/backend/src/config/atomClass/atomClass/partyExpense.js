module.exports = app => {
  const partyExpense = {
    info: {
      bean: 'partyExpense',
      title: 'PartyExpense',
      model: 'partyExpense',
      tableName: 'testPartyExpense',
      itemOnly: true,
      detail: {
        inline: true,
        atomIdMain: 'atomIdMain',
        atomClassMain: {
          module: 'test-party',
          atomClassName: 'party',
        },
      },
      enableRight: false,
      layout: {
        config: {
          atomList: 'layoutAtomListPartyExpense',
        },
      },
    },
    actions: {
      create: {},
      read: {},
      write: {},
      delete: {},
      clone: {},
      moveUp: {},
      moveDown: {},
    },
    validator: 'partyExpense',
  };
  return partyExpense;
};
