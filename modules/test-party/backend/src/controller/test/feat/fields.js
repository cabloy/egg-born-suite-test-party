const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class FieldsController extends app.Controller {
    async parseSchema() {
      // ok
      this.ctx.success();
    }
  }
  return FieldsController;
};
