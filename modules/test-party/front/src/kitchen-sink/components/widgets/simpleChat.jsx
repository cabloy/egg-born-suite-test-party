// export
export default {
  installFactory,
};

const _subscribePath = '/test/party/simpleChat';

// installFactory
function installFactory(_Vue) {
  const Vue = _Vue;
  const ebDashboardWidgetBase = Vue.prototype.$meta.module.get('a-dashboard').options.mixins.ebDashboardWidgetBase;
  return {
    meta: {
      widget: {
        schema: {
          props: null,
          attrs: null,
        },
      },
    },
    mixins: [ebDashboardWidgetBase],
    data() {
      return {
        messagesData: [],
        ioHelper: null,
        ioSimple: null,
        messageClass: {
          module: 'test-party',
          messageClassName: 'simpleChat',
        },
      };
    },
    computed: {
      user() {
        return this.$store.state.auth.user.op;
      },
    },
    created() {
      this.__init();
    },
    mounted() {
      this.messagebar = this.$refs.messagebar.f7Messagebar;
      this.messages = this.$refs.messages.f7Messages;
    },
    beforeDestroy() {
      this._stopSubscribe();
    },
    methods: {
      async __init() {
        // queueScroll
        this._queueScroll = this.$meta.util.queue(this._queueTaskScroll.bind(this));
        this._scroll(true);
        await this._initIOHelper();
        this._startSubscribe();
      },
      async _initIOHelper() {
        // io helper
        const action = {
          actionModule: 'a-socketio',
          actionComponent: 'io',
          name: 'helper',
        };
        this.ioHelper = await this.$meta.util.performAction({ ctx: this, action });
      },
      _startSubscribe() {
        // socket io
        this.ioSimple = this.ioHelper.simple({
          messageClass: this.messageClass,
          onMessageOffset: this._onMessageOffset.bind(this),
          onMessagePush: this._onMessagePush.bind(this),
        });
        this.ioSimple.subscribe({
          path: _subscribePath,
        });
      },
      _stopSubscribe() {
        if (this.ioSimple) {
          // unsubscribe
          this.ioSimple.unsubscribe();
          this.ioSimple = null;
        }
      },
      async _onMessageOffset() {
        let res = await this.$api.post('/a/socketio/message/offset', {
          messageClass: this.messageClass,
          options: {
            where: {
              messageRead: null,
            },
            orders: [['id', 'desc']],
            offset: 18, // just one page
          },
        });
        if (res.offset === -1) {
          res = await this.$api.post('/a/socketio/message/offset', {
            messageClass: this.messageClass,
            options: {
              where: {
                messageRead: null,
              },
              orders: [['id', 'asc']],
              offset: 0, // from the beginning
            },
          });
        }
        // ok
        return res;
      },
      _onMessagePush({ messages, message }) {
        // messages
        this.messagesData = messages;
        // message
        message.meta = {
          type: message.content.sender.userId === this.user.id ? 'sent' : 'received',
        };
        // scroll
        this._scroll(false);
      },
      isFirstMessage(item, index) {
        const previousItem = this.messagesData[index - 1];
        if (item.isTitle) return false;
        if (
          !previousItem ||
          previousItem.meta.type !== item.meta.type ||
          previousItem.content.sender.userId !== item.content.sender.userId
        ) {
          return true;
        }
        return false;
      },
      isLastMessage(item, index) {
        const nextItem = this.messagesData[index + 1];
        if (item.isTitle) return false;
        if (
          !nextItem ||
          nextItem.meta.type !== item.meta.type ||
          nextItem.content.sender.userId !== item.content.sender.userId
        ) {
          return true;
        }
        return false;
      },
      isTailMessage(item, index) {
        return this.isLastMessage(item, index);
      },
      getAvatar(avatar) {
        return this.$meta.util.combineAvatarUrl(avatar, 48);
      },
      _scroll(init) {
        this.$nextTick(() => {
          this._queueScroll.push(init);
        });
      },
      _queueTaskScroll(init, cb) {
        let scrollTopNew;
        const $container = this.$$(this.$refs.messages.$el);
        if (init) {
          scrollTopNew = 0;
        } else {
          scrollTopNew = $container[0].scrollHeight - $container[0].offsetHeight;
          if (scrollTopNew <= 0) return cb();
        }
        if ($container.scrollTop() === scrollTopNew) return cb();
        $container.scrollTop(scrollTopNew, 300, cb);
      },
      onKeydown(event) {
        if (event.keyCode === 13 && this.$device.desktop) {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            // donothing
          } else {
            event.preventDefault();
            this.__onSubmit(this.messagebar.getValue());
          }
        }
      },
      onSubmit(value) {
        this.__onSubmit(value);
      },
      async __onSubmit(value) {
        value = (value || '').trim();
        if (!value) return;
        // message
        const message = {
          id: null,
          messageType: 1, // text
          messageFilter: 0,
          messageGroup: 0,
          userIdTo: -2,
          userIdFrom: this.user.id,
          content: {
            text: value,
            sender: {
              userId: this.user.id,
              name: this.user.userName,
              avatar: this.user.avatar,
            },
          },
          messageRead: 1,
        };
        this.ioSimple.pushMessage(message);
        // clear
        this.messagebar.clear();
        // focus
        if (value) {
          this.messagebar.focus();
        }
        // send
        const data = await this.$api.post('test/feat/socketio/simpleChat', {
          message,
        });
        message.id = data.id;
        this.ioSimple.setMessageOffset(message.id);
      },
      _renderMessagebar() {
        return (
          <f7-messagebar
            ref="messagebar"
            placeholder="Message"
            resizePage={false}
            onSubmit={this.onSubmit}
            onKeydown={this.onKeydown}
          >
            <f7-icon f7="::send" slot="send-link"></f7-icon>
          </f7-messagebar>
        );
      },
      _renderMessages() {
        const domMessages = [];
        for (let index = 0; index < this.messagesData.length; index++) {
          const item = this.messagesData[index];
          let domText;
          if (item.content.text) {
            domText = <span slot="text">{item.content.text}</span>;
          }
          domMessages.push(
            <f7-message
              key={index}
              type={item.meta.type}
              name={item.content.sender.name}
              avatar={this.getAvatar(item.content.sender.avatar)}
              first={this.isFirstMessage(item, index)}
              last={this.isLastMessage(item, index)}
              tail={this.isTailMessage(item, index)}
            >
              {domText}
            </f7-message>
          );
        }
        return (
          <f7-messages ref="messages" scrollMessages={false}>
            <f7-messages-title>{this.$meta.util.formatDate()}</f7-messages-title>
            {domMessages}
          </f7-messages>
        );
      },
    },
    render() {
      const domMessagebar = this._renderMessagebar();
      const domMessages = this._renderMessages();
      return (
        <f7-card class="demo-widget-simple-chat">
          <f7-card-header>{this.$text('Simple Chat')}</f7-card-header>
          <f7-card-content>
            {domMessages}
            {domMessagebar}
          </f7-card-content>
        </f7-card>
      );
    },
  };
}
