const extend = require('@cabloy/extend');

const atomClasses = require('./meta/atomClass/atomClasses.js');
const schemas = require('./meta/validation/schemas.js');
const keywords = require('./meta/validation/keywords.js');
// socketio
const socketioTest = require('./meta/socketio/test.js');
const socketioSimpleChat = require('./meta/socketio/simpleChat.js');
// static
const staticApps = require('./meta/static/apps.js');
const staticDashboards = require('./meta/static/dashboards.js');
const staticLayouts = require('./meta/static/layouts.js');
const staticResources = require('./meta/static/resources.js');
const staticDicts = require('./meta/static/dicts.js');
const staticRoles = require('./meta/static/roles.js');
// cli commands
const cliCommands = require('./meta/cli/commands.js');
// icons
const iconGroups = require('./meta/icons/groups.js');
// meta
const meta = {};
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
if (module.meta.isTest) {
  // meta
  extend(true, meta, {
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
module.exports = meta;
