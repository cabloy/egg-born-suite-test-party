module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      const info = data.info;
      info.config = ctx.bean.util.extend(info.config, {
        modules: {},
      });
      // next
      await next();
    }
  }

  return EventBean;
};
