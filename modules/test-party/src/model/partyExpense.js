const moduleInfo = module.info;
module.exports = class PartyExpense extends module.meta.class.ModelCache {
  constructor() {
    super({
      table: 'testPartyExpense',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelPartyExpense' },
      },
    });
  }
};
