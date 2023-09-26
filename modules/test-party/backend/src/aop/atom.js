const assert = require('assert');

module.exports = ctx => {
  class Atom {
    async create(context, next) {
      await next();
      assert.equal(!!context.result, true);
    }
    async _submitDirect(context, next) {
      await next();
      assert.equal(!!context.result, true);
    }
  }

  return Atom;
};
