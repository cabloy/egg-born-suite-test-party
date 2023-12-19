<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('Load Component Async')" eb-back-link="Back"></eb-navbar>
    <f7-block-title>by eb-component</f7-block-title>
    <f7-block inset>
      <eb-component module="test-party" name="loadComponentAsync">
        <div slot="scoped" slot-scope="{ user }" class="alert-info">Slot: scoped - {{ user.name }}</div>
        <div slot="named" class="alert-info">Slot: named</div>
        <div class="alert-info">Slot: default</div>
      </eb-component>
    </f7-block>
    <f7-block-title>by manual</f7-block-title>
    <f7-block inset>
      <template v-if="componentReady">
        <loadComponentAsync>
          <div slot="scoped" slot-scope="{ user }" class="alert-info">Slot: scoped - {{ user.name }}</div>
          <div slot="named" class="alert-info">Slot: named</div>
          <div class="alert-info">Slot: default</div>
        </loadComponentAsync>
      </template>
    </f7-block>
  </eb-page>
</template>
<script>
export default {
  data() {
    return {
      componentReady: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      // use component
      const component = await this.$meta.module.useComponent('test-party', 'loadComponentAsync');
      // register component
      this.$options.components.loadComponentAsync = component;
      // ready
      this.componentReady = true;
    },
  },
};
</script>
<style scoped></style>
