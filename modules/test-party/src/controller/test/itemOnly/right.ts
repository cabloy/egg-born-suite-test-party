import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestItemOnlyRight extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async checkRightCreate() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.atomClass);
  }

  async checkRightRead() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.key);
  }

  async createRaw() {
    const itemKey = await this.ctx.bean.atom.create({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(itemKey);
  }

  async checkRightWrite() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.key);
  }

  async checkRightAction() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.key);
  }
}
