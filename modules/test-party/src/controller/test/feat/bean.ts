import { __ThisModule__ } from '../../../resource/this.js';
import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatBean extends BeanBase<ScopeModule> {
  async bean() {
    const a = 3;
    const b = 4;
    let res;

    // app.bean
    assert.equal(this.app.bean['test-party.test.app'], this.app.bean['test-party.test.app']);

    res = this.app.bean['test-party.test.app'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.app.bean['test-party.test.app'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // ctx.bean: global
    assert.equal(this.ctx.bean.testctx, this.ctx.bean.testctx);

    // magic
    res = this.ctx.bean.testctx.magic;
    assert.equal(res, 'magic:simpleaop');

    // name
    this.ctx.bean.testctx.name = 'test-party:regexpaop:simpleaop';
    res = this.ctx.bean.testctx.name;
    assert.equal(res, 'test-party:regexpaop:simpleaop');

    res = this.ctx.bean.testctx.actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop:simpleaop`);

    res = await this.ctx.bean.testctx.actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop:simpleaop`);

    res = await this.ctx.bean.testctx.actionAsync2({ a, b });
    assert.equal(res, `test-party:regexpaop:simpleaop:${a + b}:regexpaop:simpleaop`);

    res = await this.ctx.bean.testctx.actionAsync3({ a, b });
    assert.equal(res, `test-party:regexpaop:simpleaop:${a + b}:regexpaop:simpleaop`);

    // ctx.bean: class
    assert.equal(this.ctx.bean['test-party.test.class'], this.ctx.bean['test-party.test.class']);

    res = this.ctx.bean['test-party.test.class'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.ctx.bean['test-party.test.class'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // magic of self
    this.ctx.bean.testctx.magicSelf = '__magicSelf__';
    res = this.ctx.bean.testctx.magicSelf;
    assert.equal(res, '__magicSelf__');
    res = this.ctx.bean.testctx['magic:self'];
    assert.equal(res, '__magicSelf__');

    // ok
    this.ctx.success();
  }

  async local() {
    let res;

    // general way
    res = this.ctx.bean._getBean('test-party.local.test').name;
    assert.equal(res, 'localTest');

    // this module
    res = this.ctx.bean.local.test.name;
    assert.equal(res, 'localTest');

    // other module
    res = this.ctx.bean.local.module(__ThisModule__).test.name;
    assert.equal(res, 'localTest');

    // ok
    this.ctx.success();
  }
}
