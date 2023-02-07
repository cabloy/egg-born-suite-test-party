<template>
  <eb-page>
    <eb-navbar large largeTransparent title="Socket IO" eb-back-link="Back"></eb-navbar>
    <f7-messagebar ref="messagebar" placeholder="Message" @submit="onSubmit" @keydown="onKeydown">
      <f7-icon f7="::send" slot="send-link"></f7-icon>
    </f7-messagebar>
    <f7-messages ref="messages">
      <f7-messages-title>{{ new Date() }}</f7-messages-title>
      <f7-message
        v-for="(item, index) in messagesData"
        :key="index"
        :type="item.meta.type"
        :name="item.meta.author.name"
        :avatar="item.meta.author.avatar"
        :first="isFirstMessage(item, index)"
        :last="isLastMessage(item, index)"
        :tail="isTailMessage(item, index)"
      >
        <span slot="text" v-if="item.content.text" v-text="`${item.id || ''}:${item.content.text}`"></span>
      </f7-message>
    </f7-messages>
  </eb-page>
</template>
<script>
const _subscribePath = '/test/party/test';
export default {
  data() {
    return {
      messagesData: [],
      ioHelper: null,
      ioSimple: null,
      messageClass: {
        module: 'test-party',
        messageClassName: 'test',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user.op;
    },
    userAvatar() {
      return this.$meta.util.combineAvatarUrl(this.user.avatar, 48);
    },
    userAuthor() {
      return {
        userId: this.user.id,
        name: this.user.userName,
        avatar: this.userAvatar,
      };
    },
    userSystem() {
      const avatar = this.$meta.util.combineAvatarUrl(null, 48);
      return {
        userId: 0,
        name: 'System',
        avatar,
      };
    },
  },
  beforeDestroy() {
    this._stopSubscribe();
  },
  created() {
    this.__init();
  },
  mounted() {
    this.messagebar = this.$refs.messagebar.f7Messagebar;
    this.messages = this.$refs.messages.f7Messages;
  },
  methods: {
    async __init() {
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
    _onMessagePush({ messages, message }) {
      // messages
      this.messagesData = messages;
      // message
      message.meta = {
        type: message.userIdTo === this.user.id ? 'received' : 'sent',
        author: message.userIdFrom === this.user.id ? this.userAuthor : this.userSystem,
      };
    },
    isFirstMessage(item, index) {
      const previousItem = this.messagesData[index - 1];
      if (item.isTitle) return false;
      if (
        !previousItem ||
        previousItem.meta.type !== item.meta.type ||
        previousItem.meta.author.userId !== item.meta.author.userId
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
        nextItem.meta.author.userId !== item.meta.author.userId
      ) {
        return true;
      }
      return false;
    },
    isTailMessage(item, index) {
      return this.isLastMessage(item, index);
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
      // message
      const message = {
        id: null,
        messageType: 1, // text
        messageFilter: 0,
        messageGroup: 0,
        userIdTo: 0,
        userIdFrom: this.user.id,
        content: {
          text: value,
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
      const data = await this.$api.post('test/feat/socketio/publish', {
        message,
      });
      message.id = data.id;
      this.ioSimple.setMessageOffset(message.id);
    },
  },
};
</script>
