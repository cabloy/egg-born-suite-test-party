export default {
  methods: {
    async _onActionPartyOverBulk() {
      const { ctx, item } = this.$props;
      // confirm
      await ctx.$view.dialog.confirm();
      // atomClass
      const atomClass = {
        module: item.module,
        atomClassName: item.atomClassName,
      };
      // keys
      const selectedAtoms = ctx.bulk.selectedAtoms;
      const keys = selectedAtoms.map(item => {
        return { atomId: item.atomId, itemId: item.itemId };
      });
      // overBulk
      const res = await ctx.$api.post('/test/party/party/overBulk', { atomClass, keys });
      // change
      for (const key of res.keys) {
        // action
        ctx.$meta.eventHub.$emit('atom:action', { key, atomClass, action: { name: 'save' } });
      }
      // clear selection, 清除已经完成的部分
      ctx.bulk_clearSelectedAtoms();
      // check result
      if (res.keys.length === keys.length) return true;
      return this.$text('PartyOverBulkNotAllDone');
    },
  },
};
