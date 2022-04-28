const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  class QueueController extends app.Controller {
    async pushAsync() {
      const res = await this.ctx.meta.util.queuePushAsync({
        module: 'test-party',
        queueName: 'queueTest',
        data: { a: 1, b: 2 },
      });
      assert.equal(res, 3);
      this.ctx.success();
    }

    async push() {
      this.ctx.meta.util.queuePush({
        module: 'test-party',
        queueName: 'queueTest',
        data: { a: 1, b: 2 },
      });
      this.ctx.success();
    }
  }

  return QueueController;
};
