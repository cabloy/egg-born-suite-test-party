import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const assert = require('assert');

@Controller()
export class ControllerTestFeatInstance extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async instance() {
    assert.equal(!!this.ctx.instance.id, true);
    assert.equal(!!this.ctx.instance.config, true);
    this.ctx.success();
  }
}
