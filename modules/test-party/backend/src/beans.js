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
const ioMessageTest = require('./bean/io.message.test.js');
const ioMessageSimpleChat = require('./bean/io.message.simpleChat.js');
const sequenceTest = require('./bean/sequence.test.js');
const statsTasksUser = require('./bean/stats.tasksUser.js');
const statsTasksInstance = require('./bean/stats.tasksInstance.js');
const summerCacheTest = require('./bean/summer.cache.test.js');

module.exports = app => {
  const beans = {
    // version
    'version.manager': {
      mode: 'app',
      bean: versionManager,
    },
  };
  Object.assign(beans, {
    // cli
    'cli.default.demo': {
      mode: 'ctx',
      bean: cliDefaultDemo,
    },
    // test
    'test.app': {
      mode: 'app',
      bean: testApp,
    },
    'test.class': {
      mode: 'app',
      bean: testClass,
    },
    testctx: {
      mode: 'ctx',
      bean: testCtx,
      global: true,
    },
    'local.test': {
      mode: 'ctx',
      bean: localTest,
    },
    // event
    'event.helloEcho': {
      mode: 'ctx',
      bean: eventHelloEcho,
    },
    'event.userVerify': {
      mode: 'ctx',
      bean: eventUserVerify,
    },
    'event.loginInfo': {
      mode: 'ctx',
      bean: eventLoginInfo,
    },
    'event.loginInfoDashboard': {
      mode: 'ctx',
      bean: eventLoginInfoDashboard,
    },
    // broadcast
    'broadcast.test': {
      mode: 'app',
      bean: broadcastTest,
    },
    // queue
    'queue.test': {
      mode: 'app',
      bean: queueTest,
    },
    // schedule
    'schedule.test': {
      mode: 'app',
      bean: scheduleTest,
    },
    // startup
    'startup.startupAll': {
      mode: 'app',
      bean: startupStartupAll,
    },
    'startup.startupInstance': {
      mode: 'app',
      bean: startupStartupInstance,
    },
    // middleware
    'middleware.testInterception': {
      mode: 'ctx',
      bean: middlewareTestInterception,
    },
    'middleware.testRestructuring': {
      mode: 'ctx',
      bean: middlewareTestRestructuring,
    },
    // atom
    'atom.party': {
      mode: 'app',
      bean: atomParty,
    },
    // io
    'io.message.test': {
      mode: 'ctx',
      bean: ioMessageTest,
    },
    'io.message.simpleChat': {
      mode: 'ctx',
      bean: ioMessageSimpleChat,
    },
    // sequence
    'sequence.test': {
      mode: 'ctx',
      bean: sequenceTest,
    },
    // stats
    'stats.tasksUser': {
      mode: 'ctx',
      bean: statsTasksUser,
    },
    'stats.tasksInstance': {
      mode: 'ctx',
      bean: statsTasksInstance,
    },
    // summer
    'summer.cache.test': {
      mode: 'ctx',
      bean: summerCacheTest,
    },
  });

  return beans;
};
