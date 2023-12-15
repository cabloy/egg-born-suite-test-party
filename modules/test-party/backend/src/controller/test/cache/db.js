const assert = require('assert');

module.exports = class DbController {
  async db() {
    let res;
    let value;

    // name
    const name = '__test:name:db';

    // getset
    value = await this.ctx.cache._db.getset(name, 'zhen.nann');
    assert.equal(value, undefined);

    value = await this.ctx.cache._db.getset(name, 'zhennann');
    assert.equal(value, 'zhen.nann');

    // has
    res = await this.ctx.cache._db.has(name);
    assert.equal(res, true);

    // get
    value = await this.ctx.cache._db.get(name);
    assert.equal(value, 'zhennann');

    // remove
    await this.ctx.cache._db.remove(name);
    res = await this.ctx.cache._db.has(name);
    assert.equal(res, false);

    // set with timeout
    await this.ctx.cache._db.set(name, 'zhennann', 2000);

    // get
    value = await this.ctx.cache._db.get(name);
    assert.equal(value, 'zhennann');

    // other module's cache
    const moduleCache = this.ctx.cache._db.module(this.ctx.module.info.relativeName);
    value = await moduleCache.get(name);
    assert.equal(value, 'zhennann');

    // get after timeout
    await sleep(3000);
    value = await this.ctx.cache._db.get(name);
    assert.equal(value, undefined);

    // done
    this.ctx.success();
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
