module.exports = app => {
  const moduleInfo = module.info;
  class MonkeyeeController extends app.Controller {
    async test() {
      this.ctx.success(moduleInfo.relativeName);
    }
  }

  return MonkeyeeController;
};
