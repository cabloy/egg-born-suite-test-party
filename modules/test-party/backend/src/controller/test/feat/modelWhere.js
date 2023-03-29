const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  const atomStaticKey = '--modelWhere--test--';
  const __rows = [
    { atomStaticKey, atomName: 'atom-one', atomStage: 0 },
    { atomStaticKey, atomName: 'atom-two', atomStage: 1 },
    { atomStaticKey, atomName: 'atom-three', atomStage: 2 },
  ];

  class ModelController extends app.Controller {
    async modelWhere() {
      // model
      const model = this.ctx.model.module('a-base').atom;

      // insert one row
      await model.insert(__rows[0]);
      // insert multi rows
      await model.insert(__rows.slice(1));

      // select: or false/false
      let list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [false, false],
        },
      });
      assert.equal(list.length, 0);
      // select: or false/clause
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [false, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 1);
      // select: or true/false
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [true, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 3);

      // delete
      await model.delete({ atomStaticKey });

      // count
      const count = await model.count({ atomStaticKey });
      assert.equal(count, 0);

      // done
      this.ctx.success();
    }
  }

  return ModelController;
};
