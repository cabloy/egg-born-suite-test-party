<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('State Management')" eb-back-link="Back"></eb-navbar>
    <f7-block>
      <eb-button :onPerform="testModuleCurrent">{{ $text('this.$local') }}</eb-button>
      <eb-button :onPerform="testModuleOther">{{ $text('this.$store') }}</eb-button>
    </f7-block>
  </eb-page>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    testModuleCurrent() {
      // state
      const message = this.$local.state.message;
      console.log('this.$local.state.message: ', message);
      // getters
      const message2 = this.$local.getters('message2');
      console.log("this.$local.getters('message2'): ", message2);
      // mutations
      this.$local.commit('setMessage', 'test for commit');
      // actions
      this.$local.dispatch('getMessage').then(data => {
        console.log("this.$local.dispatch('getMessage'): ", data);
      });
    },
    testModuleOther() {
      //
      this.$meta.module.use('test-party', () => {
        // state
        const message = this.$store.getState('test/party/message');
        console.log("this.$store.getState('test/party/message'): ", message);
        // getters
        const message2 = this.$store.getters['test/party/message2'];
        console.log("this.$store.getters['test/party/message2']: ", message2);
        // mutations
        this.$store.commit('test/party/setMessage', 'test for commit');
        // actions
        this.$store.dispatch('test/party/getMessage').then(data => {
          console.log("this.$store.dispatch('test/party/getMessage'): ", data);
        });
      });
      //
      this.$store
        .dispatch('a/cms/getLanguages', {
          atomClass: {
            module: 'a-cms',
            atomClassName: 'article',
          },
        })
        .then(data => {
          console.log("this.$store.dispatch('a/cms/getLanguages', { atomClass }): ", data);
        });
    },
  },
};
</script>
<style scoped></style>
