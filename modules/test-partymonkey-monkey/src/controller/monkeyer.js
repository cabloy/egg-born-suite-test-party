const moduleInfo = module.info;
module.exports = class MonkeyerController {
  async test() {
    const config = this.ctx.config.module('test-party');
    this.ctx.success({
      moduleName: moduleInfo.relativeName,
      monkeyed: config.monkeyed,
    });
  }
};
