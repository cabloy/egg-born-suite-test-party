import { Bean, BeanBase } from '@cabloy/core';

const assert = require('assert');

@Bean({ scene: 'event' })
export class EventUserVerify extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    assert(data.profileUser.profileId > 0);
    // next
    await next();
  }
}
