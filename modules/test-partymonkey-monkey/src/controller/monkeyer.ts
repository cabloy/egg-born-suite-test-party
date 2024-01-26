import { __ThisModule__ } from '../resource/this.js';
import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestPartymonkey } from '../index.js';

@Controller()
export class ControllerMonkeyer extends BeanBase {
  @Use()
  scope: ScopeModuleTestPartymonkey;

  async test() {
    const config = this.ctx.config.module('test-party');
    this.ctx.success({
      moduleName: __ThisModule__,
      monkeyed: config.monkeyed,
    });
  }
}
