<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('Treeview')" eb-back-link="Back" />
    <f7-block-title>Basic tree view</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="Item 1">
          <f7-treeview-item label="Sub Item 1">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
          <f7-treeview-item label="Sub Item 2">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label="Item 2">
          <f7-treeview-item label="Sub Item 1">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
          <f7-treeview-item label="Sub Item 2">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label="Item 3" />
      </f7-treeview>
    </f7-block>
    <f7-block-title>With icons</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="Share" icon-f7="::share">
          <f7-treeview-item label="Facebook" icon-f7=":social:facebook" />
          <f7-treeview-item label="Twitter" icon-f7=":social:twitter" />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
    <f7-block-title>With checkboxes</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="Share" icon-f7="::share">
          <f7-checkbox
            slot="content-start"
            :checked="Object.values(checkboxes.images).indexOf(false) < 0"
            :indeterminate="
              Object.values(checkboxes.images).indexOf(false) >= 0 &&
              Object.values(checkboxes.images).indexOf(true) >= 0
            "
            @change="e => Object.keys(checkboxes.images).forEach(k => (checkboxes.images[k] = e.target.checked))"
          />
          <f7-treeview-item label="Facebook" icon-f7=":social:facebook">
            <f7-checkbox
              slot="content-start"
              :checked="checkboxes.images['avatar.png']"
              @change="checkboxes.images['avatar.png'] = $event.currentTarget.checked"
            />
          </f7-treeview-item>
          <f7-treeview-item label="Twitter" icon-f7=":social:twitter">
            <f7-checkbox
              slot="content-start"
              :checked="checkboxes.images['background.jpg']"
              @change="checkboxes.images['background.jpg'] = $event.currentTarget.checked"
            />
          </f7-treeview-item>
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
    <f7-block-title>Whole item as toggle</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item item-toggle label="Share" icon-f7="::share">
          <f7-treeview-item label="Facebook" icon-f7=":social:facebook" />
          <f7-treeview-item label="Twitter" icon-f7=":social:twitter" />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
    <f7-block-title>Selectable</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item
          selectable
          :selected="selectedItem === 'images'"
          label="Share"
          icon-f7="::share"
          @click="toggleSelectable($event, 'images')"
        >
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'avatar.png'"
            label="Facebook"
            icon-f7=":social:facebook"
            @click="toggleSelectable($event, 'avatar.png')"
          />
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'background.jpg'"
            label="Twitter"
            icon-f7=":social:twitter"
            @click="toggleSelectable($event, 'background.jpg')"
          />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
    <f7-block-title>Preload children</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item toggle load-children icon-f7="::people" label="Users" @treeview:loadchildren="loadChildren">
          <f7-treeview-item
            v-for="(item, index) in loadedChildren"
            :key="index"
            icon-f7="::person"
            :label="item.name"
          />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
    <f7-block-title>With links</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item icon-f7="::database" item-toggle label="Modals">
          <f7-treeview-item
            link="/test/party/kitchen-sink/framework7/action-sheet"
            icon-f7=":editor:insert-link-outline"
            label="Action Sheet"
          />
        </f7-treeview-item>
        <f7-treeview-item icon-f7="::database" item-toggle label="Navigation Bars">
          <f7-treeview-item
            link="/test/party/kitchen-sink/framework7/navbar"
            icon-f7=":editor:insert-link-outline"
            label="Navbar"
          />
          <f7-treeview-item
            link="/test/party/kitchen-sink/framework7/toolbar-tabbar"
            icon-f7=":editor:insert-link-outline"
            label="Toolbar & Tabbar"
          />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
  </eb-page>
</template>
<script>
export default {
  data() {
    return {
      checkboxes: {
        images: {
          'avatar.png': false,
          'background.jpg': false,
        },
        documents: {
          'cv.docx': false,
          'info.docx': false,
        },
        '.gitignore': false,
        '.index.html': false,
      },
      selectedItem: null,
      loadedChildren: [],
    };
  },
  methods: {
    toggleSelectable(e, item) {
      const self = this;
      const $ = self.$$;
      if ($(e.target).is('.treeview-toggle')) return;
      self.selectedItem = item;
    },
    loadChildren(e, done) {
      const self = this;
      setTimeout(function () {
        // call done() to hide preloader
        done();
        self.loadedChildren = [
          {
            name: 'John Doe',
          },
          {
            name: 'Jane Doe',
          },
          {
            name: 'Calvin Johnson',
          },
        ];
      }, 2000);
    },
  },
};
</script>
