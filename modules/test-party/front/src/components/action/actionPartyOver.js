export default {
  methods: {
    async _onActionPartyOver() {
      const { ctx, item } = this.$props;
      const key = { atomId: item.atomId, itemId: item.itemId };
      await ctx.$view.dialog.confirm();
      await ctx.$api.post('/test/party/party/over', { key });
      ctx.$meta.eventHub.$emit('atom:action', { key, action: { name: 'save' } });
      return true;
    },
  },
};
