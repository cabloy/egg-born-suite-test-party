const versionManager = require('./bean/version.manager.js');
const cliDefaultDemo = require('./bean/cli.default.demo.js');
const testApp = require('./bean/test.app.js');
const testClass = require('./bean/test.class.js');
const testCtx = require('./bean/test.ctx.js');
const localTest = require('./bean/local.test.js');
const eventHelloEcho = require('./bean/event.helloEcho.js');
const eventUserVerify = require('./bean/event.userVerify.js');
const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventLoginInfoDashboard = require('./bean/event.loginInfoDashboard.js');
const broadcastTest = require('./bean/broadcast.test.js');
const queueTest = require('./bean/queue.test.js');
const scheduleTest = require('./bean/schedule.test.js');
const startupStartupAll = require('./bean/startup.startupAll.js');
const startupStartupInstance = require('./bean/startup.startupInstance.js');
const middlewareTestInterception = require('./bean/middleware.interception.js');
const middlewareTestRestructuring = require('./bean/middleware.restructuring.js');
const atomParty = require('./bean/atom.party.js');
const atomPartyExpense = require('./bean/atom.partyExpense.js');
const ioMessageTest = require('./bean/io.message.test.js');
const ioMessageSimpleChat = require('./bean/io.message.simpleChat.js');
const sequenceTest = require('./bean/sequence.test.js');
const statsTasksUser = require('./bean/stats.tasksUser.js');
const statsTasksInstance = require('./bean/stats.tasksInstance.js');
const summerCacheTest = require('./bean/summer.cache.test.js');

module.exports = {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // cli
  'cli.default.demo': {
    bean: cliDefaultDemo,
  },
  // test
  'test.app': {
    bean: testApp,
  },
  'test.class': {
    bean: testClass,
  },
  testctx: {
    bean: testCtx,
    global: true,
  },
  'local.test': {
    bean: localTest,
  },
  // event
  'event.helloEcho': {
    bean: eventHelloEcho,
  },
  'event.userVerify': {
    bean: eventUserVerify,
  },
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.loginInfoDashboard': {
    bean: eventLoginInfoDashboard,
  },
  // broadcast
  'broadcast.test': {
    bean: broadcastTest,
  },
  // queue
  'queue.test': {
    bean: queueTest,
  },
  // schedule
  'schedule.test': {
    bean: scheduleTest,
  },
  // startup
  'startup.startupAll': {
    bean: startupStartupAll,
  },
  'startup.startupInstance': {
    bean: startupStartupInstance,
  },
  // middleware
  'middleware.testInterception': {
    bean: middlewareTestInterception,
  },
  'middleware.testRestructuring': {
    bean: middlewareTestRestructuring,
  },
  // atom
  'atom.party': {
    bean: atomParty,
  },
  'atom.partyExpense': {
    bean: atomPartyExpense,
  },
  // io
  'io.message.test': {
    bean: ioMessageTest,
  },
  'io.message.simpleChat': {
    bean: ioMessageSimpleChat,
  },
  // sequence
  'sequence.test': {
    bean: sequenceTest,
  },
  // stats
  'stats.tasksUser': {
    bean: statsTasksUser,
  },
  'stats.tasksInstance': {
    bean: statsTasksInstance,
  },
  // summer
  'summer.cache.test': {
    bean: summerCacheTest,
  },
};
