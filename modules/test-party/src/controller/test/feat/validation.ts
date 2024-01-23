import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestFeatValidation extends BeanBase {
  async success() {
    this.ctx.success();
  }

  async fail() {
    this.ctx.success();
  }

  async schema() {
    this.ctx.success();
  }
}
