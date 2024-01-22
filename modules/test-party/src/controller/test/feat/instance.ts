const assert = require('assert');

module.exports = class InstanceController {
  async instance() {
    assert.equal(!!this.ctx.instance.id, true);
    assert.equal(!!this.ctx.instance.config, true);
    this.ctx.success();
  }
};
