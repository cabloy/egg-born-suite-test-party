<template>
  <eb-page>
    <eb-navbar :title="page_title" eb-back-link="Back">
      <f7-nav-right>
        <eb-link ref="buttonSubmit" iconF7="::save" :onPerform="onPerformSave"></eb-link>
      </f7-nav-right>
    </eb-navbar>
    <template v-if="module">
      <eb-box>
        <eb-markdown-editor ref="editor" :value="content" @input="onInput" @save="onSave" />
      </eb-box>
    </template>
  </eb-page>
</template>
<script>
import Vue from 'vue';
const ebPageDirty = Vue.prototype.$meta.module.get('a-components').options.mixins.ebPageDirty;
export default {
  mixins: [ebPageDirty],
  meta: {
    size: 'medium',
  },
  data() {
    return {
      module: null,
      content: '',
    };
  },
  computed: {
    page_title() {
      const title = this.$text('Markdown Editor');
      return this.page_getDirtyTitle(title);
    },
  },
  created() {
    this.$meta.module.use('a-markdown', module => {
      this.module = module;
      this.content = `# Markdown Spec

> [Markdown Spec](http://commonmark.org/help/)

---

*Italic*

**Bold**

# Heading 1

## Heading 2

[Link](https://zhennann.com/)

![Image](${this.$meta.util.combineStaticPath('a-base', 'img/avatar_user.png')})

> Blockquote

* List
* List
* List

- [x] Done
- [ ] Doing

1. One
2. Two
3. Three

Horizontal Rule

---

\`Inline code\` with backticks

\`\`\`
# code block
print '3 backticks or'
print 'indent 4 spaces'
\`\`\`

| Title1 | Title2 | Title3 |
| :--  | :--: | ----: |
| Left | Center | Right |


::: alert-success
:::

::: alert-info
:::

::: alert-warning
:::

::: alert-danger
:::

::: hljs-left
Left
:::

::: hljs-center
Center
:::

::: hljs-right
Right
:::`;
    });
  },
  methods: {
    async onPerformSave() {
      if (!this.$refs.editor) return;
      await this.$refs.editor.checkContent();
      this.$view.toast.show({ text: this.$text('Saved') });
      this.page_setDirty(false);
    },
    onInput(data) {
      if (this.content === data) return;
      this.content = data;
      this.page_setDirty(true);
    },
    onSave() {
      this.$refs.buttonSubmit.onClick();
    },
  },
};
</script>
<style lang="less" scoped></style>
