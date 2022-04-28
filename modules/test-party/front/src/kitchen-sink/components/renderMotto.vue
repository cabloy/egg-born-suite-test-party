<template>
  <eb-list-input type="textarea" :input="false" dataPath="context.dataPath" :label="$text('Motto')">
    <div slot="input">
      <div v-if="errorMessage" class="item-component-invalid-input-text">{{ errorMessage }}</div>
    </div>
    <textarea
      slot="root"
      type="textarea"
      :value="context.getValue()"
      @input="onInput"
      class="json-textarea"
      :style="{ height }"
      :placeholder="$text('Motto')"
    ></textarea>
  </eb-list-input>
</template>
<script>
import Vue from 'vue';
const ebValidateCheck = Vue.prototype.$meta.module.get('a-components').options.mixins.ebValidateCheck;
export default {
  mixins: [ebValidateCheck],
  props: {
    context: {
      type: Object,
    },
    height: {
      type: String,
    },
  },
  data() {
    return {
      errorMessage: null,
    };
  },
  created() {},
  methods: {
    getDataPath() {
      return this.context.dataPath;
    },
    onValidateError(error) {
      this.errorMessage = error;
    },
    onInput(event) {
      this.context.setValue(event.currentTarget.value);
      this.$emit('input', event.currentTarget.value);
      this.clearValidateError();
    },
  },
};
</script>
<style scoped></style>
