module.exports = class TestController {
  async getOpenid() {
    const res = await this.ctx.service.test.getOpenid({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async getOpenidMini() {
    const res = await this.ctx.service.test.getOpenidMini({
      providerScene: this.ctx.request.body.providerScene,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
};
