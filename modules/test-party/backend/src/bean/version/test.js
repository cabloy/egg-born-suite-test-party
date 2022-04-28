const testData = require('./testData.js');

module.exports = function (ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionTest {
    async run() {
      // role rights
      await this._testRoleRights();
      // role resource rights
      await this._testRoleResources();
    }

    // role rights
    async _testRoleRights() {
      // // atomClass: role
      // await ctx.bean.role.addRoleRightBatch({
      //   module: 'a-base',
      //   atomClassName: 'role',
      //   roleRights: testData.roleRightsRole,
      // });
    }

    // role resource rights
    async _testRoleResources() {
      await ctx.bean.resource.addRoleResourceBatch({
        roleResources: testData.roleResources,
      });
    }
  }

  return VersionTest;
};
