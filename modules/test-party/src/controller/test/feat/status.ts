import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const assert = require('assert');

@Controller()
export class ControllerTestFeatStatus extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async status() {
    // name
    const name = '__test_enable';

    // get
    let value = await this.ctx.bean.status.get(name);
    assert.equal(value, undefined);

    // set
    await this.ctx.bean.status.set(name, true);

    // get
    value = await this.ctx.bean.status.get(name);
    assert.equal(value, true);

    // other module's status
    const moduleStatus = this.ctx.bean.status.module(this.ctx.module.info.relativeName);
    value = await moduleStatus.get(name);
    assert.equal(value, true);

    // set
    await this.ctx.bean.status.set(name, false);

    // get
    value = await this.ctx.bean.status.get(name);
    assert.equal(value, false);

    // done
    this.ctx.success();
  }
}
