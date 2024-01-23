import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const assert = require('assert');

@Controller()
export class ControllerTestCtxRequest extends BeanBase {
  async request() {
    // param
    assert.equal(this.ctx.params.id, '1');
    assert.equal(this.ctx.getInt('id'), 1);

    // query
    assert.equal(this.ctx.query.age, '18');
    assert.equal(this.ctx.getInt('age'), 18);

    // body
    assert.equal(this.ctx.request.body.userName, 'zhennann');
    assert.equal(this.ctx.getStr('userName'), 'zhennann');

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
