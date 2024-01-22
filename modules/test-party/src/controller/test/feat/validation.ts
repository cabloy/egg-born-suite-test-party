module.exports = class ValidationController {
  async success() {
    this.ctx.success();
  }

  async fail() {
    this.ctx.success();
  }

  async schema() {
    this.ctx.success();
  }
};
