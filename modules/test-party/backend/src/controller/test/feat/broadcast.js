module.exports = app => {
  class BroadcastController extends app.Controller {
    async emit() {
      this.ctx.meta.util.broadcastEmit({
        locale: 'zh-cn',
        module: 'test-party',
        broadcastName: 'broadcastTest',
        data: { message: 'hello' },
      });
      this.ctx.success();
    }
  }

  return BroadcastController;
};
