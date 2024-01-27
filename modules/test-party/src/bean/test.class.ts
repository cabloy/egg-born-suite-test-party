import { Bean, BeanBase } from '@cabloy/core';

class ClassBeanBase {
  ctx: any;

  constructor(ctx) {
    super();
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
