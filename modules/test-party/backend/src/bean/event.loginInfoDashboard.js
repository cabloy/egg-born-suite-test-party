// const moduleInfo = module.info;
module.exports = class EventBean {
  async execute(context, next) {
    const data = context.data;
    const info = data.info;
    info.config = this.ctx.bean.util.extend(info.config, {
      modules: {},
    });
    // next
    await next();
  }
};
