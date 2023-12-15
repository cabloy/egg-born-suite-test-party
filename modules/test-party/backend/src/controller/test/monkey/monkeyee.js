module.exports =
  const moduleInfo = module.info;
  class MonkeyeeController {
    async test() {
      this.ctx.success(moduleInfo.relativeName);
    }
  }

  ;
