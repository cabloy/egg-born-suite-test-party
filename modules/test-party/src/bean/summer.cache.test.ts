import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'summer.cache' })
export class SummerCacheTest extends BeanBase {
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
