import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestResourceRight extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async checkRightResourceUser() {
    // checked by route/middleware
    this.ctx.success(this.ctx.meta._resource);
  }
}
