// export
export default {
  installFactory,
};

// installFactory
function installFactory(_Vue) {
  const Vue = _Vue;
  const ebAppMenuLayoutBlockListItemsBase =
    Vue.prototype.$meta.module.get('a-app').options.mixins.ebAppMenuLayoutBlockListItemsBase;
  return {
    mixins: [ebAppMenuLayoutBlockListItemsBase],
    data() {
      return {
        wx: null,
        wxConfig: null,
        openid: null,
      };
    },
    methods: {
      async onInit() {
        try {
          const action = {
            actionModule: 'a-wechat',
            actionComponent: 'jssdk',
            name: 'config',
          };
          const res = await this.$meta.util.performAction({ ctx: this, action });
          this.wx = res && res.wx;
          this.wxConfig = res && res.config;
        } catch (err) {
          this.$view.toast.show({ text: err.message });
        }
      },
      getMessageBar() {
        return this.$refs.messagebar.f7Messagebar;
      },
      onPerformScanQRCode() {
        if (!this.wx) {
          return this.$text('Not In Wechat');
        }
        this.wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: res => {
            this.$view.toast.show({ text: res.resultStr });
          },
          fail: res => {
            this.$view.toast.show({ text: res.errMsg });
          },
        });
      },
      async onPerformOpenid() {
        const data = await this.$api.post('test/getOpenid');
        this.openid = data.openid;
      },
      _renderCardTools() {
        return (
          <f7-card>
            <f7-card-header>{this.$text('Tools')}</f7-card-header>
            <f7-card-content>
              <eb-list no-hairlines-md>
                <eb-list-item title="微信扫一扫" link="#" propsOnPerform={this.onPerformScanQRCode}></eb-list-item>
                <eb-list-item title="获取openid" link="#" propsOnPerform={this.onPerformOpenid}></eb-list-item>
                <eb-list-item title="openid">
                  <div slot="after">{this.openid}</div>
                </eb-list-item>
              </eb-list>
            </f7-card-content>
          </f7-card>
        );
      },
    },
    render() {
      if (!this.ready) return null;
      return <div>{this._renderCardTools()}</div>;
    },
  };
}
