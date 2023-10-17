module.exports = function SelfFactory(ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionUpdate {
    async run(options) {
      // create table: testPartyExpense
      const sql = `
        CREATE TABLE testPartyExpense (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          atomIdMain int(11) DEFAULT '0',
          detailLineNo int(11) DEFAULT '0',
          name varchar(50) DEFAULT NULL,
          price int(11) DEFAULT '0',
          quantity int(11) DEFAULT '0',
          amount int(11) DEFAULT '0',
          remark varchar(255) DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};
