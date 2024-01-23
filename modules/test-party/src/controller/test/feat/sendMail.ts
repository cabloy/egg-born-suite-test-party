import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestFeatSendMail extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

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
