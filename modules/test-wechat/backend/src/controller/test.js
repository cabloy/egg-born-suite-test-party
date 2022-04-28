module.exports = app => {
  class TestController extends app.Controller {
    async getOpenid() {
      const res = await this.service.test.getOpenid({
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }

    async getOpenidMini() {
      const res = await this.service.test.getOpenidMini({
        providerScene: this.ctx.request.body.providerScene,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }
  return TestController;
};
