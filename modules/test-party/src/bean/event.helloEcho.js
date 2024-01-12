// const moduleInfo = module.info;
module.exports = class EventBean {
  async execute(context, next) {
    const data = context.data;
    data.text = 'hello echo';
    context.result = `${context.result}.echo`;
    await next();
    context.result = `echo.${context.result}`;
  }
};
