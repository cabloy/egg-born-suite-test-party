import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestCtxConfig extends BeanBase<ScopeModule> {
  async test() {
    // current module
    let message = this.ctx.config.message;
    assert.equal(message, 'Hello World');

    // other module
    message = this.ctx.config.module('test-party').message;
    assert.equal(message, 'Hello World');

    // done
    this.ctx.success();
  }
}
