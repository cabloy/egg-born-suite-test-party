import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestWechat } from '../index.js';

@Controller()
export class ControllerTest extends BeanBase {
  @Use()
  scope: ScopeModuleTestWechat;

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
