const assert = require('assert');

module.exports = class EventBean {
  async execute(context, next) {
    const data = context.data;
    assert(data.profileUser.profileId > 0);
    // next
    await next();
  }
};
