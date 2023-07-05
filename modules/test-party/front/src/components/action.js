import Vue from 'vue';
import ActionPartyOver from './action/actionPartyOver.js';
import ActionPartyOverBulk from './action/actionPartyOverBulk.js';
const ebActionBase = Vue.prototype.$meta.module.get('a-base').options.mixins.ebActionBase;

export default {
  meta: {
    global: false,
  },
  mixins: [
    ebActionBase, //
    ActionPartyOver,
    ActionPartyOverBulk,
  ],
  methods: {
    async onAction() {
      const action = this.action;
      const actionName = action.actionName || action.name;
      if (actionName === 'partyOver') {
        return await this._onActionPartyOver();
      } else if (actionName === 'partyOverBulk') {
        return await this._onActionPartyOverBulk();
      }
    },
  },
};
