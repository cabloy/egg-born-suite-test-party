const assert = require('assert');

module.exports = app => {
  class Startup extends app.meta.BeanBase {
    async execute() {
      console.log(`test/feat/startup: instance:${this.ctx.instance.id}`);
      assert(this.ctx.instance.id > 0);
    }
  }

  return Startup;
};
