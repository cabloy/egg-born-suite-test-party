import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestCtxRequest extends BeanBase<ScopeModule> {
  async request() {
    // param
    assert.equal(this.ctx.params.id, '1');

    // query
    assert.equal(this.ctx.query.age, '18');

    // body
    assert.equal(this.ctx.request.body.userName, 'zhennann');

    // done
    this.ctx.success();
  }

  async requestXML() {
    // payload
    const payload = await this.ctx.getPayload();
    // return
    this.ctx.status = 200;
    this.ctx.type = 'text/xml';
    this.ctx.body = payload.toString();
  }
}
