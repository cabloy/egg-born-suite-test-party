import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestFeatSendMail extends BeanBase<ScopeModule> {
  async sendMail() {
    // send
    const message = this.ctx.request.body.data;
    await this.ctx.bean.mail.send({
      scene: 'test',
      message,
    });
    // done
    this.ctx.success();
  }
}
