export default {
  props: {
    remarkInit: {
      type: String,
    },
  },
  data() {
    return {
      remark: null,
    };
  },
  created() {
    this.remark = this.remarkInit;
  },
  methods: {
    onFormSubmit() {
      this.$refs.buttonSubmit.onClick();
    },
    async onSubmit() {
      await this.$view.dialog.confirm(this.remark);
    },
    open() {
      this.$refs.sheet.f7Sheet.open();
    },
  },
  render() {
    return (
      <f7-sheet ref="sheet" fill>
        <f7-toolbar>
          <div class="left"></div>
          <div class="right">
            <eb-link ref="buttonSubmit" propsOnPerform={event => this.onSubmit(event)}>
              {this.$text('Cancel Flow')}
            </eb-link>
          </div>
        </f7-toolbar>
        <f7-page-content>
          <eb-list form inline-labels no-hairlines-md onSubmit={event => this.onFormSubmit(event)}>
            <eb-list-input
              label={this.$text('Remark')}
              type="text"
              clear-button
              placeholder={this.$text('Remark')}
              v-model={this.remark}
            ></eb-list-input>
          </eb-list>
        </f7-page-content>
      </f7-sheet>
    );
  },
};
