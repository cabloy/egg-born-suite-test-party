module.exports = app => {
  class DemoController extends app.Controller {
    async demo() {
      const jsFile = await this._prepareJSFile();
      const DemoFn = app.meta.util.requireDynamic(jsFile);
      const demo = new (DemoFn(this.ctx))();
      const result = await demo.execute();
      this.ctx.success(result);
    }

    async _prepareJSFile() {}
  }

  return DemoController;
};
