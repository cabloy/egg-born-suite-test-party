const testData = require('./testData.js');

module.exports = class VersionTest {
  async run(options) {
    // role rights
    await this._testRoleRights();
    // role resource rights
    await this._testRoleResources();
  }

  // role rights
  async _testRoleRights() {
    // // atomClass: role
    // await this.ctx.bean.role.addRoleRightBatch({
    //   module: 'a-base',
    //   atomClassName: 'role',
    //   roleRights: testData.roleRightsRole,
    // });
  }

  // role resource rights
  async _testRoleResources() {
    await this.ctx.bean.resource.addRoleResourceBatch({
      roleResources: testData.roleResources,
    });
  }
};
