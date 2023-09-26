const assert = require('assert');

module.exports = app => {
  class InstanceController extends app.Controller {
    async instance() {
      assert.equal(!!this.ctx.instance.id, true);
      assert.equal(!!this.ctx.instance.config, true);
      this.ctx.success();
    }
  }
  return InstanceController;
};
