const assert = require('assert');

// const moduleInfo = module.info;
module.exports = class EventBean {
  async execute(context, next) {
    const data = context.data;
    assert(data.profileUser.profileId > 0);
    // next
    await next();
  }
};
