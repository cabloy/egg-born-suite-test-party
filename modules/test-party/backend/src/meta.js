const require3 = require('require3');
const extend = require3('@zhennann/extend');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const meta = {};
  // schemas
  const schemas = require('./config/validation/schemas.js')(app);
  // keywords
  const keywords = require('./config/validation/keywords.js')(app);
  // socketio
  const socketioTest = require('./config/socketio/test.js')(app);
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
      atoms: {
        party: {
          info: {
            bean: 'party',
            title: 'Party',
            tableName: 'testParty',
            tableNameModes: {},
            language: false,
            category: true,
            tag: true,
            cms: true,
            dict: {
              fields: {
                partyTypeCode: {
                  dictKey: 'test-party:dictPartyType',
                  // separator: '/',
                },
                partyCountry: {
                  dictKey: 'a-dictbooster:countries',
                },
                partyCity: {
                  translate: false,
                },
              },
            },
            layout: {
              config: {
                atomList: 'layoutAtomListParty',
                atomItem: 'layoutAtomItemParty',
              },
            },
            areaScope: {
              sameAs: {
                module: moduleInfo.relativeName,
                atomClassName: 'party',
              },
              schemas: {
                partyCountry: {
                  type: 'string',
                  ebType: 'dict',
                  ebTitle: 'Party Country',
                  ebParams: {
                    dictKey: 'a-dictbooster:countries',
                    mode: 'select',
                  },
                  ebOptionsBlankAuto: true,
                },
                partyCity: {
                  type: 'string',
                  ebType: 'component',
                  ebTitle: 'Party City',
                  ebRender: {
                    module: moduleInfo.relativeName,
                    name: 'renderPartyCity',
                  },
                  ebParams: {
                    separator: '/',
                    leafOnly: false,
                  },
                },
              },
            },
          },
          actions: {
            partyOver: {
              code: 101,
              title: 'PartyOver',
              actionModule: moduleInfo.relativeName,
              actionComponent: 'action',
              icon: { f7: ':outline:check-circle-outline' },
              enableOnOpened: true,
              directShowOnList: true,
              stage: 'formal',
            },
            partyOverBulk: {
              code: 201,
              title: 'PartyOver',
              actionModule: moduleInfo.relativeName,
              actionComponent: 'action',
              icon: { f7: ':outline:check-circle-outline' },
              bulk: true,
              select: true,
              stage: 'formal',
            },
          },
          validator: 'party',
          search: {
            validator: 'partySearch',
          },
        },
      },
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
        party: {
          schemas: 'party',
        },
        partySearch: {
          schemas: 'partySearch',
        },
        userTest: {
          schemas: 'settingsUser,settingsUserExtra',
        },
        instanceTest: {
          schemas: 'settingsInstance',
        },
        formTest: {
          schemas: 'formTest',
        },
        formCaptchaTest: {
          schemas: 'formCaptchaTest',
        },
        formMobileVerifyTest: {
          schemas: 'formMobileVerifyTest',
        },
        blockArticleCommentCount: {
          schemas: 'blockArticleCommentCount',
        },
      },
      keywords: {
        'x-languages': keywords.languages,
      },
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
        testParty: 'createdAt,updatedAt,atomId,partyTypeCode',
      },
    },
    socketio: {
      messages: {
        test: socketioTest,
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
