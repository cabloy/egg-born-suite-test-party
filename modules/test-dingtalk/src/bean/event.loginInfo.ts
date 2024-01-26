import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventLoginInfo extends BeanBase {
  async execute(context, next) {
    const info = context.data.info;
    const provider = info.user && info.user.provider;
    if (provider && provider.module === 'a-dingtalk' && provider.providerName === 'dingtalk') {
      info.config = this.ctx.bean.util.extend(info.config, {
        modules: {},
      });
    }
    // next
    await next();
  }
}
