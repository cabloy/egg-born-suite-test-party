module.exports = class appBean {
  actionSync({ a, b }) {
    return a + b;
  }

  async actionAsync({ a, b }) {
    return Promise.resolve(a + b);
  }
};
