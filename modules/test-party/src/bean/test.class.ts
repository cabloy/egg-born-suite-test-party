import { Bean, BeanBase } from '@cabloy/core';

class ClassBeanBase {
  constructor(ctx) {
    this.ctx = ctx;
  }

  actionSync({ a, b }) {
    return a + b;
  }
}

@Bean({ scene: 'test' })
export class TestClass extends BeanBase {
  async actionAsync({ a, b }) {
    return Promise.resolve(a + b);
  }
}
