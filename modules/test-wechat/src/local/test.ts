import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalTest extends BeanBase {
  async getOpenid({ user }: any) {
    return await this.ctx.bean.wechat.util.getOpenid({
      providerName: 'wechat',
      user,
    });
  }

  async getOpenidMini({ providerScene, user }: any) {
    return await this.ctx.bean.wechat.util.getOpenid({
      providerName: 'wechatmini',
      providerScene,
      user,
    });
  }
}
