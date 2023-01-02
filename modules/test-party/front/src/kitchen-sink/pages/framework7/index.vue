<template>
  <eb-page>
    <eb-navbar large largeTransparent title="Framework7" eb-back-link="Back"></eb-navbar>
    <eb-list no-hairlines-md>
      <eb-list-item v-for="item of items" :key="item.title">
        <div slot="title">
          <eb-link :eb-href="item.path">{{ item.titleLocale }}</eb-link>
        </div>
        <div v-if="item.source" slot="after">
          <f7-link :external="true" target="_blank" :href="getSourceUrl(item.source)">{{
            $text('kitchenSinkSource')
          }}</f7-link>
        </div></eb-list-item
      >
    </eb-list>
  </eb-page>
</template>
<script>
const items = [
  { title: 'About', path: 'kitchen-sink/framework7/about', source: 'framework7/about.vue' },
  { title: 'Accordion', path: 'kitchen-sink/framework7/accordion', source: 'framework7/accordion.vue' },
  { title: 'Action Sheet', path: 'kitchen-sink/framework7/action-sheet', source: 'framework7/action-sheet.vue' },
  { title: 'Autocomplete', path: 'kitchen-sink/framework7/autocomplete', source: 'framework7/autocomplete.vue' },
  { title: 'Badge', path: 'kitchen-sink/framework7/badge', source: 'framework7/badge.vue' },
  { title: 'Buttons', path: 'kitchen-sink/framework7/buttons', source: 'framework7/buttons.vue' },
  { title: 'Calendar / Date Picker', path: 'kitchen-sink/framework7/calendar', source: 'framework7/calendar.vue' },
  { title: 'Cards', path: 'kitchen-sink/framework7/cards', source: 'framework7/cards.vue' },
  {
    title: 'Cards Expandable',
    path: 'kitchen-sink/framework7/cards-expandable',
    source: 'framework7/cards-expandable.vue',
  },
  { title: 'Checkbox', path: 'kitchen-sink/framework7/checkbox', source: 'framework7/checkbox.vue' },
  { title: 'Chips / Tags', path: 'kitchen-sink/framework7/chips', source: 'framework7/chips.vue' },
  { title: 'Color Picker', path: 'kitchen-sink/framework7/color-picker', source: 'framework7/color-picker.vue' },
  { title: 'Contacts List', path: 'kitchen-sink/framework7/contacts-list', source: 'framework7/contacts-list.vue' },
  { title: 'Content Block', path: 'kitchen-sink/framework7/content-block', source: 'framework7/content-block.vue' },
  { title: 'Data Table', path: 'kitchen-sink/framework7/data-table', source: 'framework7/data-table.vue' },
  { title: 'Elevation', path: 'kitchen-sink/framework7/elevation', source: 'framework7/elevation.vue' },
  { title: 'FAB Morph', path: 'kitchen-sink/framework7/fab-morph', source: 'framework7/fab-morph.vue' },
  { title: 'FAB', path: 'kitchen-sink/framework7/fab', source: 'framework7/fab.vue' },
  { title: 'Form Storage', path: 'kitchen-sink/framework7/form-storage', source: 'framework7/form-storage.vue' },
  { title: 'GaugeChart', path: 'kitchen-sink/framework7/gauge', source: 'framework7/gauge.vue' },
  { title: 'Grid / Layout', path: 'kitchen-sink/framework7/grid', source: 'framework7/grid.vue' },
  { title: 'Icons', path: 'kitchen-sink/framework7/icons', source: 'framework7/icons.vue' },
  {
    title: 'Infinite Scroll',
    path: 'kitchen-sink/framework7/infinite-scroll',
    source: 'framework7/infinite-scroll.vue',
  },
  { title: 'Form Inputs', path: 'kitchen-sink/framework7/inputs', source: 'framework7/inputs.vue' },
  { title: 'Lazy Load Images', path: 'kitchen-sink/framework7/lazy-load', source: 'framework7/lazy-load.vue' },
  { title: 'List Index', path: 'kitchen-sink/framework7/list-index', source: 'framework7/list-index.vue' },
  { title: 'List View', path: 'kitchen-sink/framework7/list', source: 'framework7/list.vue' },
  { title: 'Menu', path: 'kitchen-sink/framework7/menu', source: 'framework7/menu.vue' },
  { title: 'Messsages', path: 'kitchen-sink/framework7/messages', source: 'framework7/messages.vue' },
  { title: 'Navbar', path: 'kitchen-sink/framework7/navbar', source: 'framework7/navbar.vue' },
  { title: 'Photo Browser', path: 'kitchen-sink/framework7/photo-browser', source: 'framework7/photo-browser.vue' },
  { title: 'Picker', path: 'kitchen-sink/framework7/picker', source: 'framework7/picker.vue' },
  { title: 'Popover', path: 'kitchen-sink/framework7/popover', source: 'framework7/popover.vue' },
  { title: 'Preloader', path: 'kitchen-sink/framework7/preloader', source: 'framework7/preloader.vue' },
  { title: 'Progress Bar', path: 'kitchen-sink/framework7/progressbar', source: 'framework7/progressbar.vue' },
  {
    title: 'Pull To Refresh',
    path: 'kitchen-sink/framework7/pull-to-refresh',
    source: 'framework7/pull-to-refresh.vue',
  },
  { title: 'RadioBox', path: 'kitchen-sink/framework7/radio', source: 'framework7/radio.vue' },
  { title: 'Range Slider', path: 'kitchen-sink/framework7/range', source: 'framework7/range.vue' },
  {
    title: 'Searchbar Expandable',
    path: 'kitchen-sink/framework7/searchbar-expandable',
    source: 'framework7/searchbar-expandable.vue',
  },
  { title: 'Searchbar', path: 'kitchen-sink/framework7/searchbar', source: 'framework7/searchbar.vue' },
  { title: 'Sheet Modal', path: 'kitchen-sink/framework7/sheet-modal', source: 'framework7/sheet-modal.vue' },
  { title: 'Skeleton Layouts', path: 'kitchen-sink/framework7/skeleton', source: 'framework7/skeleton.vue' },
  { title: 'Smart Select', path: 'kitchen-sink/framework7/smart-select', source: 'framework7/smart-select.vue' },
  { title: 'Sortable List', path: 'kitchen-sink/framework7/sortable', source: 'framework7/sortable.vue' },
  { title: 'Stepper', path: 'kitchen-sink/framework7/stepper', source: 'framework7/stepper.vue' },
  { title: 'Subnavbar', path: 'kitchen-sink/framework7/subnavbar', source: 'framework7/subnavbar.vue' },
  { title: 'Swipeout', path: 'kitchen-sink/framework7/swipeout', source: 'framework7/swipeout.vue' },
  { title: 'Swiper Slider', path: 'kitchen-sink/framework7/swiper', source: 'framework7/swiper.vue' },
  { title: 'Tabs', path: 'kitchen-sink/framework7/tabs', source: 'framework7/tabs.vue' },
  { title: 'Timeline', path: 'kitchen-sink/framework7/timeline', source: 'framework7/timeline.vue' },
  { title: 'ToastDialog', path: 'kitchen-sink/framework7/toast', source: 'framework7/toast.vue' },
  { title: 'ToggleSwitch', path: 'kitchen-sink/framework7/toggle', source: 'framework7/toggle.vue' },
  {
    title: 'Toolbar & Tabbar',
    path: 'kitchen-sink/framework7/toolbar-tabbar',
    source: 'framework7/toolbar-tabbar.vue',
  },
  { title: 'Tooltip', path: 'kitchen-sink/framework7/tooltip', source: 'framework7/tooltip.vue' },
  { title: 'Treeview', path: 'kitchen-sink/framework7/treeview', source: 'framework7/treeview.vue' },
  { title: 'Virtual List', path: 'kitchen-sink/framework7/virtual-list', source: 'framework7/virtual-list.vue' },
];
export default {
  data() {
    return {
      items: null,
    };
  },
  created() {
    // locale
    let _items = items.map(item => {
      return {
        titleLocale: this.$text(item.title),
        ...item,
      };
    });
    // about
    const about = _items.shift();
    // sort
    _items = _items.sort((a, b) => {
      const locale = this.$meta.util.getLocale();
      return a.titleLocale.localeCompare(b.titleLocale, locale);
    });
    // about
    _items.unshift(about);
    // ok
    this.items = _items;
  },
  methods: {
    getSourceUrl(source) {
      if (!source) return null;
      if (source.indexOf('https://') === 0) return source;
      return (
        'https://github.com/zhennann/egg-born-suite-test-party/tree/master/modules/test-party/front/src/kitchen-sink/pages/' +
        source
      );
    },
  },
};
</script>
