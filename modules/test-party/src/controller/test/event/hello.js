const assert = require('assert');

const moduleInfo = module.info;
module.exports = class HelloController {
  async hello() {
    const data = {
      text: 'hello',
    };
    let result = 'world';
    result = await this.ctx.bean.event.invoke({
      module: moduleInfo.relativeName,
      name: 'hello',
      data,
      result,
      next: async (context, next) => {
        context.result = `${context.result}.hello`;
        await next();
        context.result = `hello.${context.result}`;
      },
    });
    assert.equal(data.text, 'hello echo');
    assert.equal(result, 'echo.hello.world.echo.hello');
    this.ctx.success();
  }
};
