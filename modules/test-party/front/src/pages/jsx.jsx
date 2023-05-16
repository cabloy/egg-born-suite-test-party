import JsxComponent from '../components/jsxComponent.jsx';
export default {
  data() {
    return {
      counter: 1,
      counterComponent: null,
    };
  },
  computed: {
    atomClassBaseParty() {
      const useStoreAtomClasses = this.$store.useSync('a/basestore/atomClasses');
      if (!useStoreAtomClasses) {
        return null;
      }
      const atomClassBase = useStoreAtomClasses.getAtomClassBaseSync({
        atomClass: { module: 'test-party', atomClassName: 'party' },
      });
      return atomClassBase;
    },
    atomActionBasePartyOver() {
      const useStoreAtomActions = this.$store.useSync('a/basestore/atomActions');
      if (!useStoreAtomActions) {
        return null;
      }
      const actionBase = useStoreAtomActions.getActionBaseSync({
        atomClass: { module: 'test-party', atomClassName: 'party' },
        name: 'partyOver',
      });
      return actionBase;
    },
  },
  created() {
    const options = { propsData: { name: 'dog' } };
    this.counterComponent = this.$meta.util.createComponentInstance(JsxComponent, options);
  },
  beforeDestroy() {
    if (this.counterComponent) {
      this.counterComponent.$destroy();
      this.counterComponent = null;
    }
  },
  methods: {
    addCounter() {
      this.counter++;
    },
    showCounter() {
      return <div>Counter: {this.counter}</div>;
    },
  },
  render() {
    console.log('atomClass: ', this.atomClassBaseParty?.title);
    console.log('atomAction: ', this.atomActionBasePartyOver?.title);
    return (
      <eb-page>
        <eb-navbar large largeTransparent title="JSX" eb-back-link="Back">
          {' '}
        </eb-navbar>
        <f7-block strong>
          {this.showCounter()}
          <f7-button onClick={this.addCounter}>Counter++</f7-button>
        </f7-block>
        <div> -- demo for jsx component --</div>
        {this.counterComponent.renderContent()}
      </eb-page>
    );
  },
};
