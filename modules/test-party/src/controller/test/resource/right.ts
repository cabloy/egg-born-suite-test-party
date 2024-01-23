import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestResourceRight extends BeanBase {
  async checkRightResourceUser() {
    // checked by route/middleware
    this.ctx.success(this.ctx.meta._resource);
  }
}
