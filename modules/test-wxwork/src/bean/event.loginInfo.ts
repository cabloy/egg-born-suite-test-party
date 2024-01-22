module.exports = class eventBean {
  async execute(context, next) {
    const info = context.data.info;
    const provider = info.user && info.user.provider;
    if (provider && provider.module === 'a-wxwork' && provider.providerName === 'wxwork') {
      info.config = this.ctx.bean.util.extend(info.config, {
        modules: {},
      });
    }
    // next
    await next();
  }
};
