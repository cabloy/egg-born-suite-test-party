module.exports = function SelfFactory(ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionUpdate {
    async run(options) {
      // alter table: testParty
      const sql = `
        ALTER TABLE testParty
          ADD COLUMN partyExpenseCount int(11) DEFAULT '0',
          ADD COLUMN partyExpenseAmount int(11) DEFAULT '0',
          ADD COLUMN partySummary text DEFAULT NULL,
          ADD COLUMN partyOverPerson int(11) DEFAULT '0',
          ADD COLUMN partyOverTime timestamp DEFAULT NULL
      `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};
