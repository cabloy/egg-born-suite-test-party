import versionManager from './bean/version.manager.js';
import cliDefaultDemo from './bean/cli.default.demo.js';
import testApp from './bean/test.app.js';
import testClass from './bean/test.class.js';
import testCtx from './bean/test.ctx.js';
import localTest from './bean/local.test.js';
import eventHelloEcho from './bean/event.helloEcho.js';
import eventUserVerify from './bean/event.userVerify.js';
import eventLoginInfo from './bean/event.loginInfo.js';
import eventLoginInfoDashboard from './bean/event.loginInfoDashboard.js';
import broadcastTest from './bean/broadcast.test.js';
import queueTest from './bean/queue.test.js';
import scheduleTest from './bean/schedule.test.js';
import startupStartupAll from './bean/startup.startupAll.js';
import startupStartupInstance from './bean/startup.startupInstance.js';
import middlewareTestInterception from './bean/middleware.interception.js';
import middlewareTestRestructuring from './bean/middleware.restructuring.js';
import atomParty from './bean/atom.party.js';
import atomPartyExpense from './bean/atom.partyExpense.js';
import ioMessageTest from './bean/io.message.test.js';
import ioMessageSimpleChat from './bean/io.message.simpleChat.js';
import sequenceTest from './bean/sequence.test.js';
import statsTasksUser from './bean/stats.tasksUser.js';
import statsTasksInstance from './bean/stats.tasksInstance.js';
import summerCacheTest from './bean/summer.cache.test.js';

export default {
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
