const assert = require('assert');

module.exports = class LocaleController {
  async enus() {
    const message = this.ctx.config.message;
    const data = {
      enus: this.ctx.text(message),
      zhcn: this.ctx.text.locale('zh-cn', message),
    };

    // done
    this.ctx.success(data);
  }

  async zhcn() {
    const message = this.ctx.config.message;
    const data = {
      zhcn: this.ctx.text(message),
      enus: this.ctx.text.locale('en-us', message),
    };

    // done
    this.ctx.success(data);
  }
};
