import { Bean, BeanBase } from '@cabloy/core';

const assert = require('assert');

@Bean({ scene: 'broadcast' })
export class BroadcastTest extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const data = context.data;
    if (!sameAsCaller) {
      // do something
    }
    // locale
    assert.equal(this.ctx.locale, 'zh-cn');
    // data
    assert.equal(data.message, 'hello');
  }
}
