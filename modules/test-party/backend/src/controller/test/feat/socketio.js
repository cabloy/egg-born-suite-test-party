const _subscribePathTest = '/test/party/test';
const _subscribePathSimpleChat = '/test/party/simpleChat';

module.exports = app => {
  const moduleInfo = module.info;
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

    async simpleChat() {
      const options = this.ctx.request.body.options;
      const message = this.ctx.request.body.message;
      message.userIdFrom = this.ctx.state.user.op.id;
      message.userIdsTo = await this._collectUserIds();
      // message.userIdTo = -1;
      const res = await this.ctx.bean.io.publish({
        path: _subscribePathSimpleChat,
        message,
        messageClass: {
          module: moduleInfo.relativeName,
          messageClassName: 'simpleChat',
        },
        options,
      });
      // done
      this.ctx.success(res);
    }

    async _collectUserIds() {
      const ioRedis = this.ctx.bean.local.module('a-socketio').redis;
      const userIds = await ioRedis._getPathUsersOnline({ path: _subscribePathSimpleChat });
      const userAdmin = await this.ctx.bean.user.get({ userName: 'admin' });
      if (userAdmin && !userIds.includes(userAdmin.id)) {
        userIds.push(userAdmin.id);
      }
      return userIds;
    }
  }

  return SocketIOController;
};
