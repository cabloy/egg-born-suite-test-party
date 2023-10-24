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
      await this._translate(item);
      await this._getMeta(item, options);
      // ok
      return item;
    }

    async select({ atomClass, options, items, user }) {
      // super
      await super.select({ atomClass, options, items, user });
      // select
      for (const item of items) {
        await this._translate(item);
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
      if (action === 'partyOver') {
        await this.model.update({
          id: key.itemId,
          partyOver: 1,
        });
        await ctx.bean.cms.render._renderArticlePush({ key, inner: false });
      }
    }

    async performActionBulk({ keys, atomClass, action, item, options, user }) {
      // super
      await super.performActionBulk({ keys, atomClass, action, item, options, user });
      // partyOverBulk
      if (action === 'partyOverBulk') {
        const resKeys = [];
        for (const key of keys) {
          const actionItem = 'partyOver';
          // check right action
          const right = await ctx.bean.atom.checkRightAction({
            atom: { id: key.atomId },
            atomClass,
            action: actionItem,
            user,
          });
          if (!right) continue;
          // over
          await this.performAction({ key, atomClass, action: actionItem, item, options, user });
          // ok
          resKeys.push(key);
        }
        return { keys: resKeys };
      }
    }

    async _translateDictPartyCountry({ partyCountry }) {
      // dictKey
      if (partyCountry !== '1' && partyCountry !== '86') return null;
      // findItem
      return await ctx.bean.dict.findItem({
        dictKey: 'a-dictbooster:countries',
        code: partyCountry,
      });
    }

    async _translateDictPartyCity({ partyCountry, partyCity }) {
      if (partyCountry !== '1' && partyCountry !== '86') return null;
      if (!partyCity) return null;
      // findItem
      const dictKey = partyCountry === '1' ? 'a-dictbooster:citiesUSA' : 'a-dictbooster:citiesChina';
      return await ctx.bean.dict.findItem({
        dictKey,
        code: partyCity,
        options: { separator: '/' },
      });
    }

    async _translate(item) {
      const dictItem = await this._translateDictPartyCity({
        partyCountry: item.partyCountry,
        partyCity: item.partyCity,
      });
      if (dictItem) {
        item._partyCityTitle = dictItem.titleFull;
        item._partyCityTitleLocale = dictItem.titleLocaleFull;
      }
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
        const dictItem = await ctx.bean.dict.findItem({
          dictKey: 'test-party:dictPartyType',
          code: item.partyTypeCode,
        });
        if (layout !== 'table') {
          meta.summary = `${dictItem.options.emoji}${dictItem.titleLocaleFull}`;
        }
      }
    }
  }

  return Atom;
};
