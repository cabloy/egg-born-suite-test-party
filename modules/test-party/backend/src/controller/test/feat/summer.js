const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SummerController extends app.Controller {
    async summer() {
      // name
      const name = 'test';
      const key1 = { id: 1 };
      const key2 = { id: 2 };

      // getCache
      const cache = this.ctx.bean.summer.getCache({ name });
      assert.equal(!!cache, true);
      let cacheOtherModule = this.ctx.bean.summer.module(moduleInfo.relativeName).getCache({ name });
      assert.equal(!!cacheOtherModule, true);
      cacheOtherModule = this.ctx.bean.summer.getCache({ module: moduleInfo.relativeName, name });
      assert.equal(!!cacheOtherModule, true);

      // get
      const value = await cache.get(key1);
      assert.equal(value.id, key1.id);

      // mget

      // set

      // mset

      // del

      // mdel

      // clear

      // await this.ctx.bean.status.set(name, true);

      // // get
      // value = await this.ctx.bean.status.get(name);
      // assert.equal(value, true);

      // // other module's status
      // const moduleStatus = this.ctx.bean.status.module(this.ctx.module.info.relativeName);
      // value = await moduleStatus.get(name);
      // assert.equal(value, true);

      // // set
      // await this.ctx.bean.status.set(name, false);

      // // get
      // value = await this.ctx.bean.status.get(name);
      // assert.equal(value, false);

      // done
      this.ctx.success();
    }
  }
  return SummerController;
};
