const assert = require('assert');

module.exports = app => {
  class Broadcast extends app.meta.BeanBase {
    async execute(context) {
      const sameAsCaller = context.sameAsCaller;
      const data = context.data;
      if (!sameAsCaller) {
        // do something
      }
      // locale
      assert.equal(this.ctx.locale, 'zh-cn');
      // data
      assert.equal(data.message, 'hello');
    }
  }

  return Broadcast;
};
