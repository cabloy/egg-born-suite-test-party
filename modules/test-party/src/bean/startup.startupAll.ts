import { Bean, BeanBase } from '@cabloy/core';

const assert = require('assert');

@Bean({ scene: 'startup' })
export class StartupStartupAll extends BeanBase {
  async execute() {
    console.log('test/feat/startup: all');
    assert.equal(this.ctx.instance, undefined);
  }
}
