const __testData = {
  mode: 'allowSpecificFields',
  fields: [
    {
      name: 'atomName',
      read: true,
      write: false,
    },
    'description',
  ],
  details: {
    'test-flow:purchaseOrderDetail': {
      mode: 'custom',
      custom: ['atomName'],
    },
  },
  basic: {
    read: true,
    write: true,
  },
};
export default {
  data() {
    return {
      // fieldsRight: null,
      fieldsRight: __testData,
    };
  },
  methods: {
    async onFieldsRightSetting(mode) {
      // queries
      const queries = {
        mode,
        module: 'test-flow',
        atomClassName: 'purchaseOrder',
      };
      // url
      const url = this.$meta.util.combineQueries('/a/fields/fieldsRight', queries);
      this.$view.navigate(url, {
        target: '_self',
        context: {
          params: {
            fieldsRight: this.fieldsRight,
          },
          callback: (code, data) => {
            if (code === 200) {
              this.fieldsRight = data;
              console.log(JSON.stringify(data, null, 2));
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
          <f7-button onClick={() => this.onFieldsRightSetting('edit')}>Edit Schema</f7-button>
          <f7-button onClick={() => this.onFieldsRightSetting('view')}>View Schema</f7-button>
        </f7-block>
      </eb-page>
    );
  },
};
