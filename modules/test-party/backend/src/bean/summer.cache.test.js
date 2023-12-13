module.exports = ctx => {
  // const moduleInfo = module.info;
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
