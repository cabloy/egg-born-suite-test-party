import { __ThisModule__ } from '../resource/this.js';
import { Atom } from '@cabloy/core';
import { BeanAtomBase } from 'cabloy-module-api-a-base';

@Atom()
export class AtomPartyExpense extends BeanAtomBase {
  get model() {
    return this.ctx.model.module(__ThisModule__).partyExpense;
  }

  async default({ atomClass, item, options, user }) {
    // partyExpense default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    this._getMeta(item);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    for (const item of items) {
      this._getMeta(item);
    }
  }

  async create({ atomClass, item, options, user }) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add partyExpense
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }) {
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update partyExpense
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete partyExpense
    await this.model.delete({
      id: key.itemId,
    });
  }

  _getMeta(item) {
    const meta = this._ensureItemMeta(item);
    // meta.flags
    if (item.quantity > 1) {
      meta.flags.push(item.quantity);
    }
    const amount = (item.amount / 100).toFixed(2);
    meta.flags.push(amount);
    // meta.summary
    meta.summary = item.remark;
  }
}
