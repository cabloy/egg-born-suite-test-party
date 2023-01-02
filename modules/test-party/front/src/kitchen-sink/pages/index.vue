<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="pageTitle" eb-back-link="Back"></eb-navbar>
    <eb-list no-hairlines-md>
      <eb-list-item v-for="item of items" :key="item.title">
        <div slot="title">
          <eb-link :eb-href="item.path">{{ item.titleLocale }}</eb-link>
        </div>
        <div v-if="item.source" slot="after">
          <f7-link :external="true" target="_blank" :href="getSourceUrl(item.source)">{{
            $text('kitchenSinkSource')
          }}</f7-link>
        </div>
      </eb-list-item>
    </eb-list>
  </eb-page>
</template>
<script>
const __items = [
  { title: 'About', path: '/a/basefront/base/about', mode: 1 },
  { title: 'Framework7', path: 'kitchen-sink/framework7/index', source: 'framework7/index.vue', mode: 1 },
  { title: 'Guide', path: 'kitchen-sink/guide', source: 'guide.vue', mode: 1 },
  { title: 'File Upload', path: 'kitchen-sink/fileUpload', source: 'fileUpload.vue' },
  { title: 'Progress Bar', path: 'kitchen-sink/progress', source: 'progress.vue' },
  { title: 'Settings', path: 'kitchen-sink/settings', source: 'settings.vue' },
  { title: 'View Size & Open Target', path: 'kitchen-sink/view/sizeTarget', source: 'view/sizeTarget.vue' },
  { title: 'Page Open & Return Value', path: 'kitchen-sink/page/openReturn', source: 'page/openReturn.vue' },
  { title: 'Box Container', path: 'kitchen-sink/box', source: 'box.vue' },
  { title: 'Markdown Editor', path: 'kitchen-sink/markdownEditor', source: 'markdownEditor.vue' },
  { title: 'Dialog', path: 'kitchen-sink/dialog', source: 'dialog.vue' },
  {
    title: 'Form / Schema / Validation',
    path: 'kitchen-sink/form-schema-validation/index',
    source: 'form-schema-validation/index.vue',
  },
  { title: 'Form / Captcha', path: 'kitchen-sink/form-captcha', source: 'form-schema-validation/captcha.vue' },
  {
    title: 'Form / SMS Verification',
    path: 'kitchen-sink/form-mobile-verify',
    source: 'form-schema-validation/mobileVerify.vue',
  },
  {
    title: 'Pull To Refresh / Infinite Scroll / Load More',
    path: 'kitchen-sink/ptrIsLoadMore',
    source: 'ptrIsLoadMore.vue',
  },
  { title: 'Button & Link', path: 'kitchen-sink/buttonLink', source: 'buttonLink.vue' },
  { title: 'Atom', path: 'kitchen-sink/atom', source: 'atom.vue' },
  { title: 'Layout(Grid)', path: 'kitchen-sink/layout/grid', source: 'layout/gridResizable.vue' },
  { title: 'Layout(Adaptive)', path: 'kitchen-sink/layout/adaptive', source: 'layout/adaptive.vue' },
  { title: 'Monkey', path: 'kitchen-sink/monkey/monkeyee', source: 'monkey/monkeyee.vue' },
  { title: 'Dragdrop(Move)', path: 'kitchen-sink/dragdrop/move', source: 'dragdrop/dragdropMove.vue' },
  { title: 'Dragdrop(Resize)', path: 'kitchen-sink/dragdrop/resize', source: 'dragdrop/dragdropResize.vue' },
  { title: 'Socket IO', path: 'kitchen-sink/socketio', source: 'socketio.vue' },
  { title: 'Mail', path: 'kitchen-sink/mail', source: 'mail.vue' },
  {
    title: 'Load Component Async',
    path: 'kitchen-sink/component/loadComponentAsync',
    source: 'component/loadComponentAsync.vue',
  },
  { title: 'Locale', path: 'kitchen-sink/locale', source: 'locale.vue' },
  { title: 'Stats', path: 'kitchen-sink/stats', source: 'stats.vue' },
  { title: 'State Management', path: 'kitchen-sink/stateManagement', source: 'stateManagement.vue' },
];
export default {
  data() {
    return {
      mode: parseInt(this.$f7route.query.mode || 1),
      items: null,
    };
  },
  computed: {
    pageTitle() {
      const title = this.mode === 2 ? 'CabloyJS' : 'Kitchen-sink';
      return this.$text(title);
    },
  },
  created() {
    this.initItems();
  },
  methods: {
    getSourceUrl(source) {
      return (
        'https://github.com/zhennann/egg-born-suite-test-party/tree/master/modules/test-party/front/src/kitchen-sink/pages/' +
        source
      );
    },
    initItems() {
      // locale
      let _items = __items.map(item => {
        return {
          titleLocale: this.$text(item.title),
          ...item,
        };
      });
      // about
      const about = _items.splice(0, 3);
      // sort
      _items = _items.sort((a, b) => {
        const locale = this.$meta.util.getLocale();
        return a.titleLocale.localeCompare(b.titleLocale, locale);
      });
      // about
      _items = about.concat(_items);
      // filter
      _items = _items.filter(item => !item.mode || item.mode === this.mode);
      // ok
      this.items = _items;
    },
  },
};
</script>
