module.exports = ctx => {
  // const moduleInfo = module.info;
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      data.text = 'hello echo';
      context.result = `${context.result}.echo`;
      await next();
      context.result = `echo.${context.result}`;
    }
  }

  return EventBean;
};
