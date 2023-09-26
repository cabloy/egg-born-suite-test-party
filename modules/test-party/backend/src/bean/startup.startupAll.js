const assert = require('assert');

module.exports = app => {
  class Startup extends app.meta.BeanBase {
    async execute() {
      console.log('test/feat/startup: all');
      assert.equal(this.ctx.instance, undefined);
    }
  }

  return Startup;
};
