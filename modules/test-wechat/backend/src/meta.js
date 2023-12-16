module.exports = app => {
  // const schemas = require('./meta/validation/schemas.js');
  const staticApps = require('./meta/static/apps.js')(app);
  const staticLayouts = require('./meta/static/layouts.js')(app);
  const staticResources = require('./meta/static/resources.js')(app);
  const meta = {
    base: {
      atoms: {},
      statics: {
        'a-app.app': {
          items: staticApps,
        },
        'a-baselayout.layout': {
          items: staticLayouts,
        },
        'a-base.resource': {
          items: staticResources,
        },
      },
    },
    validation: {
      validators: {},
      keywords: {},
      schemas: {},
    },
    event: {
      implementations: {
        'a-wechat:wechatMessage': 'wechatMessage',
        'a-wechat:wechatMessageMini': 'wechatMessageMini',
        'a-base:loginInfo': 'loginInfo',
      },
    },
  };
  return meta;
};
