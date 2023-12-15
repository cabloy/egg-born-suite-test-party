const assert = require('assert');

module.exports = class Startup {
  async execute() {
    console.log('test/feat/startup: all');
    assert.equal(this.ctx.instance, undefined);
  }
};
