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
        memberId: null,
      };
    },
    methods: {
      async onInit() {
        try {
          const action = {
            actionModule: 'a-wxwork',
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
      async onSubmitSendMessage(value, clear) {
        try {
          // clear
          clear();
          // focus
          if (value) {
            this.getMessageBar().focus();
          }
          // send
          await this.$api.post('test/sendAppMessage', {
            message: {
              text: value,
            },
          });
        } catch (err) {
          this.$view.toast.show({ text: err.message });
        }
      },
      onPerformScanQRCode() {
        if (!this.wx) {
          return this.$text('Not In Wechat Work');
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
      async onPerformMemberId() {
        const data = await this.$api.post('test/getMemberId');
        this.memberId = data.memberId;
      },
      _renderCardSendAppMessage() {
        return (
          <f7-card>
            <f7-card-header>{this.$text('Send App Message')}</f7-card-header>
            <f7-card-content>
              <f7-messagebar
                ref="messagebar"
                class="test-messagebar-app-menu"
                placeholder="Message"
                onSubmit={this.onSubmitSendMessage}
              >
                <f7-icon f7="::send" slot="send-link"></f7-icon>
              </f7-messagebar>
            </f7-card-content>
          </f7-card>
        );
      },
      _renderCardTools() {
        return (
          <f7-card>
            <f7-card-header>{this.$text('Tools')}</f7-card-header>
            <f7-card-content>
              <eb-list no-hairlines-md>
                <eb-list-item title="微信扫一扫" link="#" propsOnPerform={this.onPerformScanQRCode}></eb-list-item>
                <eb-list-item title="获取MemberId" link="#" propsOnPerform={this.onPerformMemberId}></eb-list-item>
                <eb-list-item title="MemberId">
                  <div slot="after">{this.memberId}</div>
                </eb-list-item>
              </eb-list>
            </f7-card-content>
          </f7-card>
        );
      },
    },
    render() {
      if (!this.ready) return null;
      return (
        <div>
          {this._renderCardSendAppMessage()}
          {this._renderCardTools()}
        </div>
      );
    },
  };
}