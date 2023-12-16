module.exports = app => {
  // const schemas = require('./meta/validation/schemas.js');
  const staticApps = require('./meta/static/apps.js');
  const staticLayouts = require('./meta/static/layouts.js');
  const staticResources = require('./meta/static/resources.js');
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
        'a-dingtalk:dingtalkMessageGeneral': 'dingtalkMessageGeneral',
        'a-base:loginInfo': 'loginInfo',
      },
    },
  };
  return meta;
};
