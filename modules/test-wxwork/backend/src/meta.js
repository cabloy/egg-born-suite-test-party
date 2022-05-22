module.exports = app => {
  // const schemas = require('./config/validation/schemas.js')(app);
  const staticApps = require('./config/static/apps.js')(app);
  const staticLayouts = require('./config/static/layouts.js')(app);
  const staticResources = require('./config/static/resources.js')(app);
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
        'a-wxwork:wxworkMessage': 'wxworkMessage',
        'a-base:loginInfo': 'loginInfo',
      },
    },
  };
  return meta;
};
