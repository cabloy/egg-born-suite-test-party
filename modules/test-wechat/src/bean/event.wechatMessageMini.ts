module.exports = class eventBean {
  async execute(context, next) {
    const { beanProvider, message } = context.data;
    // message
    if (message.MsgType === 'text') {
      const text = `${this.ctx.text.locale('zh-cn', 'Reply')}: ${message.Content}`;
      await this.ctx.bean.wechat.mini[beanProvider.providerScene].sendText(message.FromUserName, text);
      // break
      return;
    }
    // next
    await next();
  }
};
