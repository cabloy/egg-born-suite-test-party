module.exports = app => {
  class Atom extends app.meta.AtomCmsBase {
    async create({ atomClass, item, options, user }) {
      // super
      const key = await super.create({ atomClass, item, options, user });
      // add party
      const res = await this.ctx.model.party.insert({
        atomId: key.atomId,
      });
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
      const data = await this.ctx.model.party.prepareData(item);
      data.id = key.itemId;
      await this.ctx.model.party.update(data);
    }

    async delete({ atomClass, key, options, user }) {
      // super
      await super.delete({ atomClass, key, options, user });
      // delete party
      await this.ctx.model.party.delete({
        id: key.itemId,
      });
    }

    async checkRightAction({ atom, atomClass, action, stage, user, checkFlow }) {
      // super
      const res = await super.checkRightAction({ atom, atomClass, action, stage, user, checkFlow });
      if (!res) return res;
      if (atom.atomStage !== 1) return res;
      if (action !== 101) return res;
      // partyOver
      const item = await this.ctx.model.party.get({ id: atom.itemId });
      if (action === 101 && item.partyOver === 0) return res;
      return null;
    }

    async _translate(item) {
      // dictKey
      const partyCountry = item.partyCountry;
      if (partyCountry !== '1' && partyCountry !== '86') return;
      const dictKey = partyCountry === '1' ? 'a-dictbooster:citiesUSA' : 'a-dictbooster:citiesChina';
      // code
      const code = item.partyCity;
      if (!code) return;
      // findItem
      const dictItem = await this.ctx.bean.dict.findItem({
        dictKey,
        code,
        options: { separator: '/' },
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
      if (item.partyOver) {
        meta.flags.push(this.ctx.text('PartyOverFlag'));
      }
      if (layout !== 'table' && item.personCount) {
        meta.flags.push(item.personCount + 'P');
      }
      // meta.summary
      if (item.partyTypeCode) {
        const dictItem = await this.ctx.bean.dict.findItem({
          dictKey: 'test-party:dictPartyType',
          code: item.partyTypeCode,
        });
        meta.summary = `${dictItem.options.emoji}${dictItem.titleLocaleFull}`;
      }
    }
  }

  return Atom;
};
