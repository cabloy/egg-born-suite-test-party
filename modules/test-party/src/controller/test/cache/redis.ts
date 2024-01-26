import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
import assert from 'assert';

@Controller()
export class ControllerTestCacheRedis extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async redis() {
    let res;
    let value;

    // name
    const name = '__test:name:redis';

    // getset
    value = await this.ctx.cache.redis.getset(name, 'zhen.nann');
    assert.equal(value, undefined);

    value = await this.ctx.cache.redis.getset(name, 'zhennann');
    assert.equal(value, 'zhen.nann');

    // has
    res = await this.ctx.cache.redis.has(name);
    assert.equal(res, true);

    // get
    value = await this.ctx.cache.redis.get(name);
    assert.equal(value, 'zhennann');

    // remove
    await this.ctx.cache.redis.remove(name);
    res = await this.ctx.cache.redis.has(name);
    assert.equal(res, false);

    // set with timeout
    await this.ctx.cache.redis.set(name, 'zhennann', 2000);

    // get
    value = await this.ctx.cache.redis.get(name);
    assert.equal(value, 'zhennann');

    // other module's cache
    const moduleCache = this.ctx.cache.redis.module(this.ctx.module.info.relativeName);
    value = await moduleCache.get(name);
    assert.equal(value, 'zhennann');

    // get after timeout
    await sleep(3000);
    value = await this.ctx.cache.redis.get(name);
    assert.equal(value, undefined);

    // done
    this.ctx.success();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
