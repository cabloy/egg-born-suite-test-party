module.exports = app => {
  const moduleInfo = module.info;
  class MonkeyerController extends app.Controller {
    async test() {
      const config = this.ctx.config.module('test-party');
      this.ctx.success({
        moduleName: moduleInfo.relativeName,
        monkeyed: config.monkeyed,
      });
    }
  }

  return MonkeyerController;
};
