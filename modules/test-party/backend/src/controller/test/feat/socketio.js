const _subscribePathTest = '/test/party/test';

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SocketIOController extends app.Controller {
    async publish() {
      const options = this.ctx.request.body.options;
      const message = this.ctx.request.body.message;
      message.userIdFrom = this.ctx.state.user.op.id;
      const res = await this.ctx.bean.io.publish({
        path: _subscribePathTest,
        message,
        messageClass: {
          module: moduleInfo.relativeName,
          messageClassName: 'test',
        },
        options,
      });
      // done
      this.ctx.success(res);
    }
  }

  return SocketIOController;
};
