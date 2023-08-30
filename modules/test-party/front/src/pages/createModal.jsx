import CreateModal from '../components/createModal.jsx';

export default {
  data() {
    return {};
  },
  methods: {
    async onCreateModalByName() {
      const options = {
        props: {
          remarkInit: 'hello world',
        },
      };
      const sheet = await this.$view.createModal({ module: 'test-party', name: 'createModal', options });
      sheet.open();
    },
    async onCreateModalByComponent() {
      const options = {
        props: {
          remarkInit: 'hello world',
        },
      };
      const sheet = await this.$view.createModal({ component: CreateModal, options });
      sheet.open();
    },
  },
  render() {
    return (
      <eb-page>
        <eb-navbar large largeTransparent title="Fields Right" eb-back-link="Back"></eb-navbar>
        <f7-block strong>
          <f7-button onClick={() => this.onCreateModalByName()}>Create Modal(module+name)</f7-button>
          <f7-button onClick={() => this.onCreateModalByComponent()}>Create Modal(component)</f7-button>
        </f7-block>
      </eb-page>
    );
  },
};
