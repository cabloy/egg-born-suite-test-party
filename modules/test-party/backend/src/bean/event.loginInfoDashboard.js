module.exports = ctx => {
  // const moduleInfo = module.info;
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
