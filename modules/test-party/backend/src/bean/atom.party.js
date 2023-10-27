module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class Atom extends ctx.app.meta.AtomCmsBase {
    constructor() {
      super(ctx);
    }

    get model() {
      return ctx.model.module(moduleInfo.relativeName).party;
    }

    async create({ atomClass, item, options, user }) {
      // super
      const key = await super.create({ atomClass, item, options, user });
      // atomState
      if (item.atomStage === 1) {
        await ctx.bean.atom.atomState({
          key: { atomId: key.atomId },
          atom: { atomState: 0 }, // ongoing
        });
      }
      // add party
      const data = {
        atomId: key.atomId,
      };
      const res = await this.model.insert(data);
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async read({ atomClass, options, key, user }) {
      // super
      const item = await super.read({ atomClass, options, key, user });
      if (!item) return null;
      // read
      await this._getMeta(item, options);
      // ok
      return item;
    }

    async select({ atomClass, options, items, user }) {
      // super
      await super.select({ atomClass, options, items, user });
      // select
      for (const item of items) {
        await this._getMeta(item, options);
      }
    }

    async write({ atomClass, target, key, item, options, user }) {
      // super
      await super.write({ atomClass, target, key, item, options, user });
      // update party
      const data = await this.model.prepareData(item);
      await this.model.update(data);
    }

    async delete({ atomClass, key, options, user }) {
      // super
      await super.delete({ atomClass, key, options, user });
      // delete party
      await this.model.delete({
        id: key.itemId,
      });
    }

    async checkRightAction({ atom, atomClass, action, options, user }) {
      // super
      return await super.checkRightAction({ atom, atomClass, action, options, user });
    }

    async performAction({ key, atomClass, action, item, options, user }) {
      // super
      await super.performAction({ key, atomClass, action, item, options, user });
      // partyOver
      // if (action === 'partyOver') {
      // }
    }

    async performActionBulk({ keys, atomClass, action, item, options, user }) {
      // super
      return await super.performActionBulk({
        keys,
        atomClass,
        action,
        item,
        options,
        user,
        fnBefore: async ({ key, actionItem }) => {
          if (actionItem === 'partyOver') {
            // write
            await ctx.bean.atom.write({ key, atomClass, item, options: { formAction: actionItem }, user });
          }
        },
      });
    }

    async _getMeta(item, options) {
      // layout: list/table/mobile/pc
      const layout = options && options.layout;
      // meta
      const meta = this._ensureItemMeta(item);
      // meta.flags
      if (layout !== 'table' && item.personCount) {
        meta.flags.push(item.personCount + 'P');
      }
      // meta.summary
      if (item.partyTypeCode) {
        if (layout !== 'table') {
          meta.summary = `${item._partyTypeCodeOptions.emoji}${item._partyTypeCodeTitleLocale}`;
        }
      }
    }
  }

  return Atom;
};
