export default {
  props: {
    context: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  watch: {
    partyCountry() {
      this.context.setValue(null);
    },
  },
  computed: {
    partyCountry() {
      return this.context.getValue('partyCountry');
    },
  },
  created() {},
  methods: {},
  render() {
    const { parcel, key, property } = this.context;
    // only support 1/86
    const partyCountry = this.partyCountry;
    if (partyCountry !== '1' && partyCountry !== '86') return null;
    // render
    const propertyNew = this.$meta.util.extend({}, property, {
      ebType: 'dict',
      ebParams: {
        dictKey: partyCountry === '1' ? 'a-dictarea:citiesUSA' : 'a-dictarea:citiesChina',
      },
      ebRender: null,
    });
    return <eb-list-item-validate parcel={parcel} dataKey={key} property={propertyNew}></eb-list-item-validate>;
  },
};
