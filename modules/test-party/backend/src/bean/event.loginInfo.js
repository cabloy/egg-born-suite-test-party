const require3 = require('require3');
const extend = require3('extend2');

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      const info = data.info;
      const provider = info.user && info.user.provider;
      if (provider && provider.module === 'a-authgithub' && provider.providerName === 'authgithub') {
        info.config = extend(true, info.config, {
          modules: {},
        });
      }
      // next
      await next();
    }
  }

  return EventBean;
};
