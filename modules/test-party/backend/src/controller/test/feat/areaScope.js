const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class AreaScopeController extends app.Controller {
    async areaScope() {
      // ok
      this.ctx.success();
    }
  }

  return AreaScopeController;
};
