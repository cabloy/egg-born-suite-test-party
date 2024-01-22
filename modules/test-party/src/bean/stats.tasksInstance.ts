const moduleInfo = module.info;
module.exports = class Stats {
  async execute(context) {
    const { keys } = context;
    const fullName = keys.join('.');
    const valueOld = await this.ctx.bean.stats._get({
      module: moduleInfo.relativeName,
      fullName,
    });
    if (valueOld === undefined) return 1;
    return valueOld + 1;
  }
};
