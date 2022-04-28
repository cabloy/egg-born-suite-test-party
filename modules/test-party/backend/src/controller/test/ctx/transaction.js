module.exports = app => {
  class TransactionController extends app.Controller {
    async transaction() {
      // user
      const user = this.ctx.state.user.op;
      // atomKey
      const atomKey = this.ctx.request.body.key;
      // itemNew
      const itemNew = this.ctx.request.body.item;

      // write
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: { atomName: itemNew.atomName },
        user,
      });
      // write: throw error when personCount is 0
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: { personCount: itemNew.personCount },
        user,
      });
      // done
      this.ctx.success();
    }
  }

  return TransactionController;
};
