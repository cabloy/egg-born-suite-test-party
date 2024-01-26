import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'test' })
export class TestApp extends BeanBase {
  actionSync({ a, b }) {
    return a + b;
  }

  async actionAsync({ a, b }) {
    return Promise.resolve(a + b);
  }
}
