export default {
  data() {
    return {
      module: null,
      name: null,
      iconSvg: '::add',
    };
  },
  created() {
    this.$store.dispatch('a/icon/getIcon', { icon: '::add' }).then(res => {
      console.log(res);
    });
  },
  methods: {
    onPerformCreate() {
      this.module = 'test-party';
      this.name = 'loadComponentAsync';
      this.iconSvg = '::close';
      // this.iconSvg = '/api/static/a/flownode/default.svg#close';
    },
    onPerformDestroy() {
      this.module = null;
      this.name = null;
    },
  },
  render() {
    return (
      <eb-page>
        <eb-navbar large largeTransparent title="Component" eb-back-link="Back"></eb-navbar>
        <f7-block>
          <eb-button propsOnPerform={this.onPerformCreate}>Create</eb-button>
          <eb-button propsOnPerform={this.onPerformDestroy}>Destroy</eb-button>
        </f7-block>
        <f7-block>
          <f7-link icon-f7="house">close</f7-link>
          <f7-link icon-f7={this.iconSvg} icon-size="16" icon-color="orange">
            close
          </f7-link>
        </f7-block>
        <f7-block>
          <span>a</span>
          {<eb-component module={this.module} name={this.name}></eb-component>}
          <span>b</span>
          <i class="icon material-icons color-orange" style="font-size: 16px; width: 16px; height: 16px;">
            <img
              style="font-size: 16px; width: 16px; height: 16px;"
              src="http://localhost:9192/api/static/a/flownode/bpmn/events/start-event-timer.svg"
            />
          </i>
          <i class="icon material-icons color-orange" style="font-size: 16px; width: 16px; height: 16px;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3z"
              />
            </svg>
          </i>
          <span>c</span>
          <f7-icon material="add"></f7-icon>
          <f7-icon material="close" size="16px" color="orange"></f7-icon>
          <span>d</span>
          <i class="icon material-icons color-orange" style="font-size: 16px; width: 16px; height: 16px;">
            <svg width="16px" height="16px">
              <use
                href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8c3ltYm9sIGlkPSJhZGQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIvPgo8L3N5bWJvbD4sPHN5bWJvbCBpZD0iY2xvc2UiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTkgNi40MUwxNy41OSA1TDEyIDEwLjU5TDYuNDEgNUw1IDYuNDFMMTAuNTkgMTJMNSAxNy41OUw2LjQxIDE5TDEyIDEzLjQxTDE3LjU5IDE5TDE5IDE3LjU5TDEzLjQxIDEyeiIvPgo8L3N5bWJvbD4KPC9zdmc+#close"
                x="0"
                y="0"
                width="16"
                height="16"
              />
            </svg>
          </i>
          <span>e</span>
          <f7-icon size="16" f7="/api/static/a/flownode/bpmn/events/start-event-timer.svg"></f7-icon>
          <span>e</span>
        </f7-block>
      </eb-page>
    );
  },
};
