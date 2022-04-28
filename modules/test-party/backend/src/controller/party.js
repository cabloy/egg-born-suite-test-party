module.exports = app => {
  class PartyController extends app.Controller {
    async over() {
      const res = await this.ctx.service.party.over({
        key: this.ctx.request.body.key,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }

    async overBulk() {
      const res = await this.ctx.service.party.overBulk({
        keys: this.ctx.request.body.keys,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }

  return PartyController;
};
