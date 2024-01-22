module.exports = class SendMailController {
  async sendMail() {
    // send
    const message = this.ctx.request.body.data;
    await this.ctx.bean.mail.send({
      scene: 'test',
      message,
    });
    // done
    this.ctx.success();
  }
};
