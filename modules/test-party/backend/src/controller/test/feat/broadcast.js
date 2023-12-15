module.exports = class BroadcastController {
  async emit() {
    this.ctx.meta.util.broadcastEmit({
      locale: 'zh-cn',
      module: 'test-party',
      broadcastName: 'broadcastTest',
      data: { message: 'hello' },
    });
    this.ctx.success();
  }
};
