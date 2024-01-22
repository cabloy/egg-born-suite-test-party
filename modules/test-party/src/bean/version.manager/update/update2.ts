module.exports = class VersionUpdate {
  async run(options) {
    const sql = `
        ALTER TABLE testParty
          ADD COLUMN partyTime timestamp DEFAULT NULL,
          ADD COLUMN partyCountry varchar(50) DEFAULT '',
          ADD COLUMN partyCity varchar(50) DEFAULT ''
      `;
    await this.ctx.model.query(sql);
  }
};