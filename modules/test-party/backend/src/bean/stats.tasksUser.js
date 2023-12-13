module.exports = ctx => {
  const moduleInfo = module.info;
  class Stats {
    async execute(context) {
      const { keys, user } = context;
      const fullName = keys.join('.');
      const valueOld = await ctx.bean.stats._get({
        module: moduleInfo.relativeName,
        fullName,
        user,
      });
      if (valueOld === undefined) return 1;
      return valueOld + 1;
    }
  }

  return Stats;
};
