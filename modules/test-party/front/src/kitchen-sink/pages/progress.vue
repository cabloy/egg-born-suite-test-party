<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('Progress Bar')" eb-back-link="Back"></eb-navbar>
    <f7-block>
      <eb-button :onPerform="onPerformStart">{{ $text('Start Working') }}</eb-button>
    </f7-block>
  </eb-page>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async onPerformStart() {
      const data = await this.$api.post('test/feat/progress');
      const progressId = data.progressId;
      const data2 = await this.$view.dialog.progressbar({ progressId, title: this.$text('Working') });
      console.log(data2);
    },
  },
};
</script>
