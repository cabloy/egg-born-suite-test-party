import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const assert = require('assert');

@Controller()
export class ControllerTestCtxConfig extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

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
