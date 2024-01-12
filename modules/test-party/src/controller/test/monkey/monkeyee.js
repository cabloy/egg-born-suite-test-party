const moduleInfo = module.info;
module.exports = class MonkeyeeController {
  async test() {
    this.ctx.success(moduleInfo.relativeName);
  }
};
