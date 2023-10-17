const extend = require('@zhennann/extend');

module.exports = app => {
  const meta = {};
  // atomClasses
  const atomClasses = require('./config/atomClass/atomClasses.js')(app);
  // schemas
  const schemas = require('./config/validation/schemas.js')(app);
  // keywords
  const keywords = require('./config/validation/keywords.js')(app);
  // socketio
  const socketioTest = require('./config/socketio/test.js')(app);
  const socketioSimpleChat = require('./config/socketio/simpleChat.js')(app);
  // static
  const staticApps = require('./config/static/apps.js')(app);
  const staticDashboards = require('./config/static/dashboards.js')(app);
  const staticLayouts = require('./config/static/layouts.js')(app);
  const staticResources = require('./config/static/resources.js')(app);
  const staticDicts = require('./config/static/dicts.js')(app);
  const staticRoles = require('./config/static/roles.js')(app);
  // cli commands
  const cliCommands = require('./config/cli/commands.js')(app);
  // icons
  const iconGroups = require('./config/icons/groups.js');
  // meta
  extend(true, meta, {
    base: {
      atoms: atomClasses,
      statics: {
        'a-app.app': {
          items: staticApps,
        },
        'a-dashboard.dashboard': {
          items: staticDashboards,
        },
        'a-baselayout.layout': {
          items: staticLayouts,
        },
        'a-base.resource': {
          items: staticResources,
        },
        'a-dict.dict': {
          items: staticDicts,
        },
        'a-base.role': {
          items: staticRoles,
        },
      },
    },
    validation: {
      validators: {
        userTest: {
          schemas: 'settingsUser,settingsUserExtra',
        },
        instanceTest: {
          schemas: 'settingsInstance',
        },
      },
      keywords,
      schemas,
    },
    cli: {
      commands: cliCommands,
    },
    settings: {
      user: {
        validator: 'userTest',
      },
      instance: {
        validator: 'instanceTest',
      },
    },
    event: {
      implementations: {
        'a-base:loginInfo': 'loginInfoDashboard',
      },
    },
    index: {
      indexes: {
        testPartyExpense: 'createdAt,updatedAt,atomIdMain',
        testParty: 'createdAt,updatedAt,atomId,partyTypeCode',
      },
    },
    socketio: {
      messages: {
        test: socketioTest,
        simpleChat: socketioSimpleChat,
      },
    },
    stats: {
      providers: {
        tasksUser: {
          user: true,
          bean: 'tasksUser',
        },
        tasksInstance: {
          user: false,
          bean: 'tasksInstance',
          dependencies: 'tasksUser',
        },
      },
    },
    icon: {
      groups: iconGroups,
    },
  });

  // only for test
  if (app.meta.isTest) {
    // meta
    extend(true, meta, {
      base: {},
      event: {
        declarations: {
          hello: 'This is a test for event',
        },
        implementations: {
          'test-party:hello': 'helloEcho',
          'a-base:userVerify': 'userVerify',
          'a-base:loginInfo': 'loginInfo',
        },
      },
      sequence: {
        providers: {
          test: {
            bean: 'test',
            start: 0,
          },
        },
      },
    });
  }

  return meta;
};
