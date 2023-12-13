module.exports = ctx => {
  // const moduleInfo = module.info;
  class eventBean {
    async execute(context, next) {
      const { message } = context.data;
      console.log('-------dingtalk callback, EventType: ', message.EventType);
      // next
      await next();
    }
  }

  return eventBean;
};
