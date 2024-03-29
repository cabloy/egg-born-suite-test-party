import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestCtxPerformAction extends BeanBase<ScopeModule> {
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
