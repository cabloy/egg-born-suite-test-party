module.exports = ctx => {
  class eventBean {
    async execute(context, next) {
      const info = context.data.info;
      const provider = info.user && info.user.provider;
      if (provider && provider.module === 'a-wechat' && provider.providerName === 'wechat') {
        info.config = ctx.bean.util.extend(info.config, {
          modules: {},
        });
      }
      // next
      await next();
    }
  }

  return eventBean;
};
