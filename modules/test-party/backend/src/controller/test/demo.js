module.exports = app => {
  class DemoController extends app.Controller {
    async demo() {
      this.ctx.success('s');
    }
  }

  return DemoController;
};
