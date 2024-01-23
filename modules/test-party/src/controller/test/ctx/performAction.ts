import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestCtxPerformAction extends BeanBase {
  async performAction() {
    // param: id
    const id = this.ctx.request.body.id;
    // performAction
    const res = await this.ctx.meta.util.performAction({
      method: 'post',
      url: 'test/ctx/performAction/echo',
      body: {
        id,
      },
    });
    this.ctx.success(res);
  }

  async echo() {
    // body: id
    const id = this.ctx.request.body.id;
    // echo back
    this.ctx.success(id);
  }
}
