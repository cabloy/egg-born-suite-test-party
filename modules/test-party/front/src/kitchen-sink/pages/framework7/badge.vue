<template>
  <eb-page>
    <eb-navbar large largeTransparent eb-back-link="Back" :title="$text('Badge')">
      <f7-nav-right>
        <f7-link icon-only>
          <f7-icon f7="::person">
            <f7-badge color="red">5</f7-badge>
          </f7-icon>
        </f7-link>
      </f7-nav-right>
    </eb-navbar>
    <f7-toolbar bottom tabbar labels>
      <f7-link tab-link="#tab-1" tab-link-active>
        <f7-icon f7="::mail">
          <f7-badge color="green">5</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Inbox</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon f7=":outline:calendar-today-outline">
          <f7-badge color="red">7</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Calendar</span>
      </f7-link>
      <f7-link tab-link="#tab-3">
        <f7-icon f7="::import">
          <f7-badge color="red">1</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Import</span>
      </f7-link>
    </f7-toolbar>
    <f7-list>
      <f7-list-item title="Foo Bar" badge="0">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="Ivan Petrov" badge="CEO" badge-color="blue">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="John Doe" badge="5" badge-color="green">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="Jane Doe" badge="NEW" badge-color="orange">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>
  </eb-page>
</template>
<script>
export default {};
</script>
