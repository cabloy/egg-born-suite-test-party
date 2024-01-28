import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatInstance extends BeanBase<ScopeModule> {
  async instance() {
    assert.equal(!!this.ctx.instance.id, true);
    assert.equal(!!this.ctx.instance.config, true);
    this.ctx.success();
  }
}
