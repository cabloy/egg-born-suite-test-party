import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerTest extends BeanBase<ScopeModule> {
  async getOpenid() {
    const res = await this.scope.local.test.getOpenid({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async getOpenidMini() {
    const res = await this.scope.local.test.getOpenidMini({
      providerScene: this.ctx.request.body.providerScene,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
