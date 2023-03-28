const party = require('./controller/party.js');
const testAtomStarLabel = require('./controller/test/atom/starLabel.js');
const testAtomAll = require('./controller/test/atom/all.js');
const testAtomRight = require('./controller/test/atom/right.js');
const testItemOnlyAll = require('./controller/test/itemOnly/all.js');
const testResourceRight = require('./controller/test/resource/right.js');
const testResourceAll = require('./controller/test/resource/all.js');
const testCtxPerformAction = require('./controller/test/ctx/performAction.js');
const testCtxTransaction = require('./controller/test/ctx/transaction.js');
const testCtxTail = require('./controller/test/ctx/tail.js');
const testCtxSession = require('./controller/test/ctx/session.js');
const testCtxRequest = require('./controller/test/ctx/request.js');
const testCtxResponse = require('./controller/test/ctx/response.js');
const testCtxConfig = require('./controller/test/ctx/config.js');
const testCtxLocale = require('./controller/test/ctx/locale.js');
const testCacheMem = require('./controller/test/cache/mem.js');
const testCacheDb = require('./controller/test/cache/db.js');
const testCacheRedis = require('./controller/test/cache/redis.js');
const testRoleUserRole = require('./controller/test/role/userRole.js');
const testMultilevelAuthorizationRole = require('./controller/test/multilevelAuthorization/role.js');
const testMultilevelAuthorizationUser = require('./controller/test/multilevelAuthorization/user.js');
const testEventHello = require('./controller/test/event/hello.js');
const testFeatBean = require('./controller/test/feat/bean.js');
const testFeatHttpLog = require('./controller/test/feat/httpLog.js');
const testFeatSendMail = require('./controller/test/feat/sendMail.js');
const testFeatSocketIO = require('./controller/test/feat/socketio.js');
const testFeatInstance = require('./controller/test/feat/instance.js');
const testFeatProgress = require('./controller/test/feat/progress.js');
const testFeatSequence = require('./controller/test/feat/sequence.js');
const testFeatSettings = require('./controller/test/feat/settings.js');
const testFeatStats = require('./controller/test/feat/stats.js');
const testFeatStatus = require('./controller/test/feat/status.js');
const testFeatSummer = require('./controller/test/feat/summer.js');
const testFeatValidation = require('./controller/test/feat/validation.js');
const testFeatMiddleware = require('./controller/test/feat/middleware.js');
const testFeatQueue = require('./controller/test/feat/queue.js');
const testFeatBroadcast = require('./controller/test/feat/broadcast.js');
const testFeatModel = require('./controller/test/feat/model.js');
const testFeatCategory = require('./controller/test/feat/category.js');
const testFeatTag = require('./controller/test/feat/tag.js');
const testOpenAuth = require('./controller/test/feat/openAuth.js');
const testMonkeyee = require('./controller/test/monkey/monkeyee.js');
const testKitchensinkAutocomplete = require('./controller/kitchen-sink/autocomplete.js');
const testKitchensinkGuide = require('./controller/kitchen-sink/guide.js');
const testKitchensinkFormSchemaValidation = require('./controller/kitchen-sink/form-schema-validation.js');
const testKitchensinkPtrIsLoadMore = require('./controller/kitchen-sink/ptr-is-loadmore.js');

module.exports = app => {
  const controllers = {
    party,
    testAtomStarLabel,
    testAtomAll,
    testAtomRight,
    testItemOnlyAll,
    testResourceRight,
    testResourceAll,
    testCtxPerformAction,
    testCtxTransaction,
    testCtxTail,
    testCtxSession,
    testCtxRequest,
    testCtxResponse,
    testCtxConfig,
    testCtxLocale,
    testCacheMem,
    testCacheDb,
    testCacheRedis,
    testRoleUserRole,
    testMultilevelAuthorizationRole,
    testMultilevelAuthorizationUser,
    testEventHello,
    testFeatBean,
    testFeatHttpLog,
    testFeatSendMail,
    testFeatSocketIO,
    testFeatInstance,
    testFeatProgress,
    testFeatSequence,
    testFeatSettings,
    testFeatStats,
    testFeatStatus,
    testFeatSummer,
    testFeatValidation,
    testFeatMiddleware,
    testFeatQueue,
    testFeatBroadcast,
    testFeatModel,
    testFeatCategory,
    testFeatTag,
    testOpenAuth,
    testMonkeyee,
    testKitchensinkAutocomplete,
    testKitchensinkGuide,
    testKitchensinkFormSchemaValidation,
    testKitchensinkPtrIsLoadMore,
  };
  return controllers;
};
