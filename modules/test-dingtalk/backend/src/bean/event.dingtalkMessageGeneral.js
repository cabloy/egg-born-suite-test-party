// const moduleInfo = module.info;
module.exports = class eventBean {
  async execute(context, next) {
    const { message } = context.data;
    console.log('-------dingtalk callback, EventType: ', message.EventType);
    // next
    await next();
  }
};
