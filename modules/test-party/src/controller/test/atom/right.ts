import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestAtomRight extends BeanBase<ScopeModule> {
  async checkRightCreate() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.atomClass);
  }

  async checkRightRead() {
    // checked by route/middleware
    this.ctx.success(this.ctx.request.body.key);
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
