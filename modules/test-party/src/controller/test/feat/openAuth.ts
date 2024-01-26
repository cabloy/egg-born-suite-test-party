import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatOpenAuth extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async resourceCheckSuccess() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.ctx.success();
  }

  async resourceCheckFail() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.ctx.success();
  }
}
