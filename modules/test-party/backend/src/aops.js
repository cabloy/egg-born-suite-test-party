const regExp = require('./aop/regExp.js');
const simple = require('./aop/simple.js');
const atom = require('./aop/atom.js');

const aops = {};
Object.assign(aops, {
  simple: {
    match: 'testctx',
    bean: simple,
  },
  regExp: {
    match: [/^test-party.test\.\w+$/, 'testctx'],
    bean: regExp,
  },
});
if (module.meta.isTest) {
  Object.assign(aops, {
    atom: {
      match: 'atom',
      bean: atom,
    },
  });
}
module.exports = aops;
