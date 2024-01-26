class ClassBeanBase {
  constructor(ctx) {
    this.ctx = ctx;
  }

  actionSync({ a, b }) {
    return a + b;
  }
}

module.exports = class classBean extends ClassBeanBase {
  async actionAsync({ a, b }) {
    return Promise.resolve(a + b);
  }
};
