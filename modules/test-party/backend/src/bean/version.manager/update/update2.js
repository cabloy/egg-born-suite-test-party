module.exports = function SelfFactory(ctx) {
  // const moduleInfo = module.info;
  class VersionUpdate {
    async run(options) {
      const sql = `
        ALTER TABLE testParty
          ADD COLUMN partyTime timestamp DEFAULT NULL,
          ADD COLUMN partyCountry varchar(50) DEFAULT '',
          ADD COLUMN partyCity varchar(50) DEFAULT ''
      `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};
