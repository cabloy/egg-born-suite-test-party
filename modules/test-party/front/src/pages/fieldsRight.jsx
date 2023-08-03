export default {
  data() {
    return {
      fieldsRight: null,
    };
  },
  methods: {
    async onFieldsRightSetting() {
      // queries
      const queries = {
        mode: 'edit',
        module: 'test-flow',
        atomClassName: 'purchaseOrder',
      };
      // url
      const url = this.$meta.util.combineQueries('/a/baseadmin/fields/fieldsRight', queries);
      this.$view.navigate(url, {
        target: '_self',
        context: {
          params: {
            fieldsRight: this.fieldsRight,
          },
          callback: (code, data) => {
            if (code === 200) {
              this.fieldsRight = data;
            }
          },
        },
      });
    },
  },
  render() {
    return (
      <eb-page>
        <eb-navbar large largeTransparent title="Fields Right" eb-back-link="Back"></eb-navbar>
        <f7-block strong>
          <f7-button onClick={this.onFieldsRightSetting}>Set Schema</f7-button>
        </f7-block>
        <pre> {this.fieldsRight} </pre>
      </eb-page>
    );
  },
};
