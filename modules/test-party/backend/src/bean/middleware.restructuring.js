module.exports = class Middleware {
  async execute(options, next) {
    const { a, b } = this.ctx.request.body;
    this.ctx.request.body.a = parseInt(a);
    this.ctx.request.body.b = parseInt(b);
    // next
    await next();
  }
};
