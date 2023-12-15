module.exports = class Middleware {
  async execute(options, next) {
    const { a, b } = this.ctx.request.body;
    if (a === undefined || b === undefined) return this.ctx.throw(1002); // 1002: 'Incomplete Parameters'
    // next
    await next();
  }
};
