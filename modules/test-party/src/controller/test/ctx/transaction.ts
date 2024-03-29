import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestCtxTransaction extends BeanBase<ScopeModule> {
  async transaction() {
    // user
    const user = this.ctx.state.user.op;
    // atomKey
    const atomKey = this.ctx.request.body.key;
    // itemNew
    const itemNew = this.ctx.request.body.item;

    // write
    await this.ctx.bean.atom.write({
      key: atomKey,
      item: { atomName: itemNew.atomName },
      user,
    });
    // write: throw error when personCount is 0
    await this.ctx.bean.atom.write({
      key: atomKey,
      item: { personCount: itemNew.personCount },
      user,
    });
    // done
    this.ctx.success();
  }
}
