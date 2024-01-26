import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
import assert from 'assert';

@Controller()
export class ControllerTestCtxTail extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async tail() {
    // 1
    this.ctx.meta._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      assert.equal(this.ctx.meta._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(this.ctx.meta._tail_test, 3);
      });
      this.ctx.meta._tail_test = 3;
    });

    // 2
    this.ctx.meta._tail_test = 2;

    // done
    this.ctx.success();
  }
}
