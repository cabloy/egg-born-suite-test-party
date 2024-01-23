import { Aop, BeanBase } from '@cabloy/core';
import assert from 'assert';

@Aop({ match: 'atom' })
export class AopAtom extends BeanBase {
  async create(context, next) {
    await next();
    assert.equal(!!context.result, true);
  }
  async _submitDirect(context, next) {
    await next();
    assert.equal(!!context.result, true);
  }
}
