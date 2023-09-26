const assert = require('assert');

module.exports = app => {
  class TestController extends app.Controller {
    async resourceCheckSuccess() {
      const user = this.ctx.state.user.op;
      assert.equal(user.userName, 'root');
      this.ctx.success();
    }

    async resourceCheckFail() {
      const user = this.ctx.state.user.op;
      assert.equal(user.userName, 'root');
      this.ctx.success();
    }
  }

  return TestController;
};
