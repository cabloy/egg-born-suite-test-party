import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerTest extends BeanBase<ScopeModule> {
  async getMemberId() {
    const res = await this.scope.local.test.getMemberId({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async sendAppMessage() {
    const res = await this.scope.local.test.sendAppMessage({
      message: this.ctx.request.body.message,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
