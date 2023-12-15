module.exports = class RightController {
  async checkRightResourceUser() {
    // checked by route/middleware
    this.ctx.success(this.ctx.meta._resource);
  }
};
