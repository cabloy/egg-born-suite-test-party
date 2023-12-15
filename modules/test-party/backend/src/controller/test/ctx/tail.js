const assert = require('assert');

module.exports = class TailController {
  async tail() {
    // 1
    this.ctx.meta._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      assert.equal(this.ctx.meta._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(this.ctx.meta._tail_test, 3);
      });
      this.ctx.meta._tail_test = 3;
    });

    // 2
    this.ctx.meta._tail_test = 2;

    // done
    this.ctx.success();
  }
};
