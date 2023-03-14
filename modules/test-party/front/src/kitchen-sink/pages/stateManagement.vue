<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('State Management')" eb-back-link="Back"></eb-navbar>
    <f7-block>
      <eb-button :onPerform="testModuleCurrent">{{ $text('this.$local') }}</eb-button>
      <eb-button :onPerform="testModuleOther">{{ $text('this.$store') }}</eb-button>
    </f7-block>
    <textarea ref="messageBox" type="textarea" style="width: 100%; height: 350px; padding: 8px"></textarea>
  </eb-page>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    log(...args) {
      const message = args.join('');
      this.$refs.messageBox.value = `${this.$refs.messageBox.value}\n${message}`;
    },
    logReset() {
      this.$refs.messageBox.value = '';
    },
    async testModuleCurrent() {
      this.logReset();
      this.log(new Date());
      // state
      const message = this.$local.state.message;
      this.log('this.$local.state.message: ', message);
      // getters
      const message2 = this.$local.getters('message2');
      this.log("this.$local.getters('message2'): ", message2);
      // mutations
      this.$local.commit('setMessage', 'test for commit');
      // actions
      const data = await this.$local.dispatch('getMessage');
      this.log("this.$local.dispatch('getMessage'): ", data);
    },
    async testModuleOther() {
      this.logReset();
      this.log(new Date());
      // use module
      await this.$meta.module.use('test-party');
      // state
      const message = this.$store.getState('test/party/message');
      this.log("this.$store.getState('test/party/message'): ", message);
      // getters
      const message2 = this.$store.getters['test/party/message2'];
      this.log("this.$store.getters['test/party/message2']: ", message2);
      // mutations
      this.$store.commit('test/party/setMessage', 'test for commit');
      // actions
      const data = await this.$store.dispatch('test/party/getMessage');
      this.log("this.$store.dispatch('test/party/getMessage'): ", data);

      // cms
      const data2 = await this.$store.dispatch('a/cms/getLanguages', {
        atomClass: {
          module: 'a-cms',
          atomClassName: 'article',
        },
      });
      this.log("this.$store.dispatch('a/cms/getLanguages', { atomClass }): ", JSON.stringify(data2, null, 2));
    },
  },
};
</script>
