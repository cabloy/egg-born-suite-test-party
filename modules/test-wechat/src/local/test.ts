import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalTest extends BeanBase {
  async getOpenid({ user }) {
    return await this.ctx.bean.wechat.util.getOpenid({
      providerName: 'wechat',
      user,
    });
  }

  async getOpenidMini({ providerScene, user }) {
    return await this.ctx.bean.wechat.util.getOpenid({
      providerName: 'wechatmini',
      providerScene,
      user,
    });
  }
}
