const assert = require('assert');

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      assert(data.profileUser.profileId > 0);
      // next
      await next();
    }
  }

  return EventBean;
};
