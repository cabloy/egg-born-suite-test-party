import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventDingtalkMessageGeneral extends BeanBase {
  async execute(context, next) {
    const { message } = context.data;
    console.log('-------dingtalk callback, EventType: ', message.EventType);
    // next
    await next();
  }
}
