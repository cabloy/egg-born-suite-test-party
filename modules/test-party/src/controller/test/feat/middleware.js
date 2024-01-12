module.exports = class TestController {
  async interception() {
    const { a, b } = this.ctx.request.body;
    const c = parseInt(a) + parseInt(b);
    this.ctx.success(c);
  }

  async restructuring() {
    const { a, b } = this.ctx.request.body;
    const c = a + b;
    this.ctx.success(c);
  }
};
