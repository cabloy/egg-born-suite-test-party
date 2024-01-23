import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const moduleInfo = module.info;

@Controller()
export class ControllerTestMonkeyMonkeyee extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async test() {
    this.ctx.success(moduleInfo.relativeName);
  }
}
