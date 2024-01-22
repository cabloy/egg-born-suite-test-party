const assert = require('assert');

module.exports = class TestController {
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
};
