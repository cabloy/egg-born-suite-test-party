module.exports = class Queue {
  async execute(context) {
    const data = context.data;
    return data.a + data.b;
  }
};
