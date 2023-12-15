const regExp = require('./aop/regExp.js');
const simple = require('./aop/simple.js');
const atom = require('./aop/atom.js');

const aops = {};
Object.assign(aops, {
  simple: {
    match: 'testctx',
    mode: 'ctx',
    bean: simple,
  },
  regExp: {
    match: [/^test-party.test\.\w+$/, 'testctx'],
    mode: 'ctx',
    bean: regExp,
  },
});
if (app.meta.isTest) {
  Object.assign(aops, {
    atom: {
      match: 'atom',
      mode: 'ctx',
      bean: atom,
    },
  });
}
module.exports = aops;
