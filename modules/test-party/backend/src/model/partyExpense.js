module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class PartyExpense extends app.meta.ModelCache {
    constructor(ctx) {
      super(ctx, {
        table: 'testPartyExpense',
        options: {
          disableDeleted: false,
          cacheName: { module: moduleInfo.relativeName, name: 'modelPartyExpense' },
        },
      });
    }
  }
  return PartyExpense;
};
