import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestWxwork } from '../index.js';

@Controller()
export class ControllerTest extends BeanBase {
  async getMemberId() {
    const res = await this.ctx.service.test.getMemberId({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async sendAppMessage() {
    const res = await this.ctx.service.test.sendAppMessage({
      message: this.ctx.request.body.message,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
