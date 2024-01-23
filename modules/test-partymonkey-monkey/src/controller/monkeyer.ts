import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestPartymonkey } from '../index.js';
const moduleInfo = module.info;

@Controller()
export class ControllerMonkeyer extends BeanBase {
  @Use()
  scope: ScopeModuleTestPartymonkey;

  async test() {
    const config = this.ctx.config.module('test-party');
    this.ctx.success({
      moduleName: moduleInfo.relativeName,
      monkeyed: config.monkeyed,
    });
  }
}
