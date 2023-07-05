import Vue from 'vue';
const ebActionBase = Vue.prototype.$meta.module.get('a-base').options.mixins.ebActionBase;

export default {
  meta: {
    global: false,
  },
  mixins: [
    ebActionBase, //
  ],
  methods: {
    onAction() {
      const action = this.action;
      const actionName = action.actionName || action.name;
      if (actionName === 'shareLink') return this._shareLink();
    },
    _shareLink() {
      const item = this.item;
      console.log(item);
      if (item.success) {
        item.success();
      }
    },
  },
};
