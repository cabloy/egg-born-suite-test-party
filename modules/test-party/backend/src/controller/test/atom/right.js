module.exports = app => {
  class RightController extends app.Controller {
    async checkRightCreate() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.atomClass);
    }

    async checkRightRead() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async checkRightWrite() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async checkRightAction() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }
  }

  return RightController;
};
