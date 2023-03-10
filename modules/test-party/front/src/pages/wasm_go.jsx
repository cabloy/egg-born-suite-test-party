import wasmDemo from '../assets/wasm/demo.wasm';

export default {
  data() {
    return {};
  },
  methods: {
    async onPerformRun1() {
      // go
      let action = {
        actionModule: 'a-wasmgo',
        actionComponent: 'sdk',
        name: 'go',
      };
      const go = await this.$meta.util.performAction({ ctx: this, action });
      // load wasm
      action = {
        actionModule: 'a-wasmgo',
        actionComponent: 'sdk',
        name: 'loadWasm',
      };
      const item = { source: wasmDemo };
      const wasmResult = await this.$meta.util.performAction({ ctx: this, action, item });
      // run
      await go.run(wasmResult.instance);
    },
    async onPerformRun2() {
      // load&run wasm
      const action = {
        actionModule: 'a-wasmgo',
        actionComponent: 'sdk',
        name: 'run',
      };
      const item = { source: wasmDemo };
      await this.$meta.util.performAction({ ctx: this, action, item });
    },
  },
  render() {
    return (
      <eb-page>
        <eb-navbar title={this.$text('Go Wasm Demo')} eb-back-link="Back">
          <f7-nav-right></f7-nav-right>
        </eb-navbar>
        <f7-block-title medium></f7-block-title>
        <f7-block strong>
          <eb-button propsOnPerform={this.onPerformRun1}>Run Wasm (Two Steps)</eb-button>
          <eb-button propsOnPerform={this.onPerformRun2}>Run Wasm (One Step)</eb-button>
        </f7-block>
      </eb-page>
    );
  },
};
