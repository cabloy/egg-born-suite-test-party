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
  { title: 'File Upload', path: 'kitchen-sink/fileUpload' },
  { title: 'Progress Bar', path: 'kitchen-sink/progress' },
  { title: 'Settings', path: 'kitchen-sink/settings' },
  { title: 'View Size & Open Target', path: 'kitchen-sink/view/sizeTarget' },
  { title: 'Page Open & Return Value', path: 'kitchen-sink/page/openReturn' },
  { title: 'Box Container', path: 'kitchen-sink/box' },
  { title: 'Markdown Editor', path: 'kitchen-sink/markdownEditor' },
  { title: 'Dialog', path: 'kitchen-sink/dialog' },
  { title: 'Form / Schema / Validation', path: 'kitchen-sink/form-schema-validation/index' },
  { title: 'Form / Captcha', path: 'kitchen-sink/form-captcha' },
  { title: 'Form / SMS Verification', path: 'kitchen-sink/form-mobile-verify' },
  { title: 'Pull To Refresh / Infinite Scroll / Load More', path: 'kitchen-sink/ptrIsLoadMore' },
  { title: 'Button & Link', path: 'kitchen-sink/buttonLink' },
  { title: 'Atom', path: 'kitchen-sink/atom' },
  { title: 'Layout(Grid)', path: 'kitchen-sink/layout/grid' },
  { title: 'Layout(Adaptive)', path: 'kitchen-sink/layout/adaptive' },
  { title: 'Monkey', path: 'kitchen-sink/monkey/monkeyee' },
  { title: 'Dragdrop(Move)', path: 'kitchen-sink/dragdrop/move' },
  { title: 'Dragdrop(Resize)', path: 'kitchen-sink/dragdrop/resize' },
  { title: 'Socket IO', path: 'kitchen-sink/socketio' },
  { title: 'Mail', path: 'kitchen-sink/mail' },
  { title: 'Load Component Async', path: 'kitchen-sink/component/loadComponentAsync' },
  { title: 'Locale', path: 'kitchen-sink/Locale' },
  { title: 'Stats', path: 'kitchen-sink/Stats' },
  { title: 'State Management', path: 'kitchen-sink/stateManagement' },
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
