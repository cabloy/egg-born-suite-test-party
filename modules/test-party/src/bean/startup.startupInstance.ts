const assert = require('assert');

module.exports = class Startup {
  async execute() {
    console.log(`test/feat/startup: instance:${this.ctx.instance.id}`);
    assert(this.ctx.instance.id > 0);
  }
};
