module.exports = function SelfFactory(ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionUpdate {
    async run(options) {
      // drop view: testPartyView
      await ctx.model.query('drop view testPartyView');
      // drop table: testPartyType
      await ctx.model.query('drop table testPartyType');
      // partyTypeId->partyTypeCode
      const sql = `
        ALTER TABLE testParty
          CHANGE COLUMN partyTypeId partyTypeCode INT(11) DEFAULT '0',
          ADD COLUMN partyTime timestamp DEFAULT NULL,
          ADD COLUMN partyCountry varchar(50) DEFAULT '',
          ADD COLUMN partyCity varchar(50) DEFAULT ''
      `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};
