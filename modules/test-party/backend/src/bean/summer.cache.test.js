module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SummerCache {
    constructor({ cacheBase }) {
      this._cacheBase = cacheBase;
    }

    async get(key) {
      return {
        id: key.id,
        name: `name_${key.id}`,
      };
    }
  }

  return SummerCache;
};
