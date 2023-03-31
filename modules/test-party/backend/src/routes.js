module.exports = (/* app */) => {
  let routes = [];
  routes = routes.concat([
    // atom: party
    {
      method: 'post',
      path: 'party/over',
      controller: 'party',
      middlewares: 'transaction',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'partyOver' } },
    },
    {
      method: 'post',
      path: 'party/overBulk',
      controller: 'party',
      middlewares: 'transaction',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'partyOverBulk' } },
    },
    // test/atom/starLabel
    { method: 'post', path: 'test/atom/starLabel', controller: 'testAtomStarLabel', middlewares: 'test' },
    // test/atom/all
    {
      method: 'get',
      path: 'test/atom/all',
      controller: 'testAtomAll',
      _middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/atom/right(checked by middleware)
    {
      method: 'post',
      path: 'test/atom/checkRightCreate',
      controller: 'testAtomRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'create' } },
    },
    {
      method: 'post',
      path: 'test/atom/checkRightRead',
      controller: 'testAtomRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'read' } },
    },
    {
      method: 'post',
      path: 'test/atom/checkRightWrite',
      controller: 'testAtomRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'write' } },
    },
    {
      method: 'post',
      path: 'test/atom/checkRightAction',
      controller: 'testAtomRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'test-party:party', action: 'partyOver' } },
    },
    // test/itemOnly/all
    {
      method: 'get',
      path: 'test/itemOnly/all',
      controller: 'testItemOnlyAll',
      _middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/resource/right
    {
      method: 'post',
      path: 'test/resource/checkRightResourceUser',
      controller: 'testResourceRight',
      middlewares: 'test',
      meta: { right: { type: 'resource', module: 'test-party', name: 'createParty' } },
    },
    // test/resource/all
    {
      method: 'post',
      path: 'test/resource/all',
      controller: 'testResourceAll',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/role/userRole
    {
      method: 'post',
      path: 'test/role/userRole',
      controller: 'testRoleUserRole',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/multilevelAuthorization/role
    {
      method: 'post',
      path: 'test/multilevelAuthorization/role',
      controller: 'testMultilevelAuthorizationRole',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/multilevelAuthorization/user
    {
      method: 'post',
      path: 'test/multilevelAuthorization/user',
      controller: 'testMultilevelAuthorizationUser',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/ctx/performAction
    { method: 'post', path: 'test/ctx/performAction', controller: 'testCtxPerformAction', middlewares: 'test' },
    { method: 'post', path: 'test/ctx/performAction/echo', controller: 'testCtxPerformAction', middlewares: 'test' },
    // test/ctx/transaction
    { method: 'post', path: 'test/ctx/transaction', controller: 'testCtxTransaction', middlewares: 'test,transaction' },
    // test/ctx/tail
    { method: 'post', path: 'test/ctx/tail', controller: 'testCtxTail', middlewares: 'test' },
    // test/ctx/session
    { method: 'post', path: 'test/ctx/session', controller: 'testCtxSession', middlewares: 'test' },
    { method: 'post', path: 'test/ctx/session/echo1', controller: 'testCtxSession', middlewares: 'test' },
    { method: 'post', path: 'test/ctx/session/echo2', controller: 'testCtxSession', middlewares: 'test' },
    // test/ctx/request
    {
      method: 'post',
      path: 'test/ctx/request/:id',
      controller: 'testCtxRequest',
      action: 'request',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/ctx/requestXML',
      controller: 'testCtxRequest',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/ctx/response
    {
      method: 'post',
      path: 'test/ctx/response/success',
      controller: 'testCtxResponse',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/ctx/response/successMore',
      controller: 'testCtxResponse',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/ctx/response/fail',
      controller: 'testCtxResponse',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/ctx/response/throwError',
      controller: 'testCtxResponse',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/ctx/config
    {
      method: 'post',
      path: 'test/ctx/config/test',
      controller: 'testCtxConfig',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/ctx/locale
    {
      method: 'post',
      path: 'test/ctx/locale/enus',
      controller: 'testCtxLocale',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/ctx/locale/zhcn',
      controller: 'testCtxLocale',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/event/hello
    {
      method: 'post',
      path: 'test/event/hello',
      controller: 'testEventHello',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/cache
    {
      method: 'post',
      path: 'test/cache/mem',
      controller: 'testCacheMem',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/cache/db',
      controller: 'testCacheDb',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'post',
      path: 'test/cache/redis',
      controller: 'testCacheRedis',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/bean
    {
      method: 'get',
      path: 'test/feat/bean',
      controller: 'testFeatBean',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    {
      method: 'get',
      path: 'test/feat/bean/local',
      controller: 'testFeatBean',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/httpLog
    {
      method: 'post',
      path: 'test/feat/httpLog',
      controller: 'testFeatHttpLog',
      middlewares: 'test,httpLog',
      meta: { auth: { enable: false } },
    },

    // test/feat/sendMail
    { method: 'post', path: 'test/feat/sendMail', controller: 'testFeatSendMail', meta: { auth: { enable: false } } },

    // test/feat/socketio
    {
      method: 'post',
      path: 'test/feat/socketio/publish',
      controller: 'testFeatSocketIO',
      middlewares: '',
      meta: { auth: { user: true } },
    },
    // simpleChat
    {
      method: 'post',
      path: 'test/feat/socketio/simpleChat',
      controller: 'testFeatSocketIO',
      middlewares: '',
      meta: { auth: { user: true } },
    },

    // test/feat/instance
    {
      method: 'post',
      path: 'test/feat/instance',
      controller: 'testFeatInstance',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/progress
    { method: 'post', path: 'test/feat/progress', controller: 'testFeatProgress' },

    // test/feat/sequence
    {
      method: 'post',
      path: 'test/feat/sequence',
      controller: 'testFeatSequence',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/settings
    { method: 'post', path: 'test/feat/settings', controller: 'testFeatSettings', middlewares: 'test' },

    // test/feat/stats
    {
      method: 'post',
      path: 'test/feat/stats',
      controller: 'testFeatStats',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    { method: 'post', path: 'test/feat/stats/plus', controller: 'testFeatStats' },

    // test/feat/status
    {
      method: 'post',
      path: 'test/feat/status',
      controller: 'testFeatStatus',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/summer
    {
      method: 'post',
      path: 'test/feat/summer',
      controller: 'testFeatSummer',
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },

    // test/feat/validation
    {
      method: 'post',
      path: 'test/feat/validation/success',
      controller: 'testFeatValidation',
      middlewares: 'test,validate',
      meta: { auth: { enable: false }, validate: { validator: 'userTest' } },
    },
    {
      method: 'post',
      path: 'test/feat/validation/fail',
      controller: 'testFeatValidation',
      middlewares: 'test,validate',
      meta: { auth: { enable: false }, validate: { validator: 'userTest' } },
    },
    {
      method: 'post',
      path: 'test/feat/validation/schema',
      controller: 'testFeatValidation',
      middlewares: 'test,validate',
      meta: { auth: { enable: false }, validate: { validator: 'userTest', schema: 'settingsUserExtra' } },
    },

    // test/feat/middleware
    {
      method: 'post',
      path: 'test/feat/middleware/interception',
      controller: 'testFeatMiddleware',
      middlewares: 'test,testInterception',
    },
    {
      method: 'post',
      path: 'test/feat/middleware/restructuring',
      controller: 'testFeatMiddleware',
      middlewares: 'test,testInterception,testRestructuring',
    },

    // test/feat/queue
    { method: 'post', path: 'test/feat/pushAsync', controller: 'testFeatQueue', middlewares: 'test' },
    { method: 'post', path: 'test/feat/push', controller: 'testFeatQueue', middlewares: 'test' },

    // test/feat/broadcast
    { method: 'post', path: 'test/feat/broadcast/emit', controller: 'testFeatBroadcast', middlewares: 'test' },

    // test/feat/model
    { method: 'post', path: 'test/feat/model', controller: 'testFeatModel', middlewares: 'test' },

    // test/feat/modelWhere
    { method: 'get', path: 'test/feat/modelWhere', controller: 'testFeatModelWhere', middlewares: 'test' },

    // test/feat/category
    { method: 'post', path: 'test/feat/category', controller: 'testFeatCategory', middlewares: 'test' },

    // test/feat/tag
    { method: 'post', path: 'test/feat/tag', controller: 'testFeatTag', middlewares: 'test' },

    // test/feat/openAuth
    {
      method: 'post',
      path: 'test/feat/openAuth/resourceCheckSuccess',
      controller: 'testOpenAuth',
      middlewares: 'test',
      meta: {
        right: { type: 'resource', name: 'mineKitchenSink' },
      },
    },
    {
      method: 'post',
      path: 'test/feat/openAuth/resourceCheckFail',
      controller: 'testOpenAuth',
      middlewares: 'test',
      meta: {
        right: { type: 'resource', module: 'test-party', name: 'createParty' },
      },
    },

    // test/monkey/monkeyee
    { method: 'post', path: 'test/monkey/monkeyee/test', controller: 'testMonkeyee', middlewares: 'test' },

    // kitchen-sink/guide
    { method: 'post', path: 'kitchen-sink/guide/echo', controller: 'testKitchensinkGuide' },
    { method: 'post', path: 'kitchen-sink/guide/echo3', controller: 'testKitchensinkGuide' },
    { method: 'post', path: 'kitchen-sink/guide/echo4', controller: 'testKitchensinkGuide' },
    { method: 'post', path: 'kitchen-sink/guide/echo6', controller: 'testKitchensinkGuide' },
    { method: 'post', path: 'kitchen-sink/guide/echo7', controller: 'testKitchensinkGuide' },
    {
      method: 'post',
      path: 'kitchen-sink/guide/echo8',
      controller: 'testKitchensinkGuide',
      middlewares: 'transaction',
    },
    {
      method: 'post',
      path: 'kitchen-sink/guide/echo9',
      controller: 'testKitchensinkGuide',
      meta: {
        right: { type: 'resource', name: 'appComponentsGuide' },
      },
    },

    // kitchen-sink/autocomplete
    {
      method: 'get',
      path: 'kitchen-sink/autocomplete/languages/:query',
      controller: 'testKitchensinkAutocomplete',
      action: 'languages',
      meta: { auth: { enable: false } },
    },
    // kitchen-sink/form-schema-validation
    {
      method: 'get',
      path: 'kitchen-sink/form-schema-validation/load',
      controller: 'testKitchensinkFormSchemaValidation',
    },
    {
      method: 'post',
      path: 'kitchen-sink/form-schema-validation/saveSimple',
      controller: 'testKitchensinkFormSchemaValidation',
    },
    {
      method: 'post',
      path: 'kitchen-sink/form-schema-validation/saveValidation',
      controller: 'testKitchensinkFormSchemaValidation',
      middlewares: 'validate',
      meta: { validate: { validator: 'formTest' } },
    },
    {
      method: 'post',
      path: 'kitchen-sink/form-captcha/signup',
      controller: 'testKitchensinkFormSchemaValidation',
      middlewares: 'captchaVerify,validate',
      meta: {
        captchaVerify: { scene: { name: 'formCaptchaTest' } },
        validate: { validator: 'formCaptchaTest' },
      },
    },
    {
      method: 'post',
      path: 'kitchen-sink/form-mobile-verify/mobileVerify',
      controller: 'testKitchensinkFormSchemaValidation',
      middlewares: 'captchaVerify,validate',
      meta: {
        captchaVerify: { scene: { name: 'formMobileVerifyTest' } },
        validate: { validator: 'formMobileVerifyTest' },
      },
    },
    // kitchen-sink/ptr-is-loadmore
    { method: 'post', path: 'kitchen-sink/ptr-is-loadmore/list', controller: 'testKitchensinkPtrIsLoadMore' },
  ]);

  return routes;
};
