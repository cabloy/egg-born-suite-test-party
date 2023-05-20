import wasmDemo from '../assets/wasm/demo.wasm';

export default {
  data() {
    return {};
  },
  methods: {
    async onPerformRun1() {
      // sdk
      const useStoreSDK = await this.$store.use('a/wasmgo/sdk');
      // go instance
      const goInstance = useStoreSDK.getInstance();
      // load wasm
      const wasmResult = await useStoreSDK.loadWasm({ source: wasmDemo });
      // run
      await goInstance.run(wasmResult.instance);
    },
    async onPerformRun2() {
      // sdk
      const useStoreSDK = await this.$store.use('a/wasmgo/sdk');
      // load&run wasm
      await useStoreSDK.run({ source: wasmDemo });
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
