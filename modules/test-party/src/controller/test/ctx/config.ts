const assert = require('assert');

module.exports = class ConfigController {
  async test() {
    // current module
    let message = this.ctx.config.message;
    assert.equal(message, 'Hello World');

    // other module
    message = this.ctx.config.module('test-party').message;
    assert.equal(message, 'Hello World');

    // done
    this.ctx.success();
  }
};
