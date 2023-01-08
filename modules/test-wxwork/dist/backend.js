/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 427:
/***/ ((module) => {

module.exports = ctx => {
  class eventBean {
    async execute(context, next) {
      const info = context.data.info;
      const provider = info.user && info.user.provider;
      if (provider && provider.module === 'a-wxwork' && provider.providerName === 'wxwork') {
        info.config = ctx.bean.util.extend(info.config, {
          modules: {},
        });
      }
      // next
      await next();
    }
  }

  return eventBean;
};


/***/ }),

/***/ 114:
/***/ ((module) => {

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class eventBean {
    async execute(context, next) {
      const { message } = context.data;
      if (message.MsgType === 'text') {
        context.result = {
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          CreateTime: new Date().getTime(),
          MsgType: 'text',
          Content: `${ctx.text.locale('zh-cn', 'Reply')}: ${message.Content}`,
        };
        // break
        return;
      }
      // next
      await next();
    }
  }

  return eventBean;
};


/***/ }),

/***/ 187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eventLoginInfo = __webpack_require__(427);
const eventWxworkMessage = __webpack_require__(114);

module.exports = app => {
  const beans = {
    'event.loginInfo': {
      mode: 'ctx',
      bean: eventLoginInfo,
    },
    'event.wxworkMessage': {
      mode: 'ctx',
      bean: eventWxworkMessage,
    },
  };
  return beans;
};


/***/ }),

/***/ 76:
/***/ ((module) => {

// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};
  return config;
};


/***/ }),

/***/ 624:
/***/ ((module) => {

// error code should start from 1001
module.exports = {};


/***/ }),

/***/ 327:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = {
  Reply: '回复',
  'Test(Wechat Work)': '测试（企业微信）',
  'Test Layout(Wechat Work)': '测试布局（企业微信）',
  'Test App Menu Layout(Wechat Work)': '测试App菜单布局（企业微信）',
};


/***/ }),

/***/ 25:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  'en-us': __webpack_require__(327),
  'zh-cn': __webpack_require__(72),
};


/***/ }),

/***/ 266:
/***/ ((module) => {

// http://localhost:9192/?appKey=test-wxwork:appTest
module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    presets: {
      authenticated: {
        // mobile: {
        //   layout: 'test-wxwork:layoutTest',
        // },
        mobile: {
          menu: {
            layout: 'test-wxwork:layoutAppMenuTest',
          },
        },
        pc: {
          menu: {
            layout: 'test-wxwork:layoutAppMenuTest',
          },
        },
      },
    },
  };
  const _app = {
    atomName: 'Test(Wechat Work)',
    atomStaticKey: 'appTest',
    atomRevision: 3,
    atomCategoryId: 'DemoIsolateApp',
    description: '',
    appIcon: ':auth:wxwork-outline',
    appIsolate: true,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};


/***/ }),

/***/ 241:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const appTest = __webpack_require__(266);

module.exports = app => {
  const apps = [
    //
    appTest(app),
  ];
  return apps;
};


/***/ }),

/***/ 192:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    layouts: {
      list: {
        blocks: {
          items: {
            component: {
              module: moduleInfo.relativeName,
              name: 'appTestMenuLayoutBlockListItems',
            },
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'Test App Menu Layout(Wechat Work)',
    atomStaticKey: 'layoutAppMenuTest',
    atomRevision: 0,
    description: '',
    layoutTypeCode: 13,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};


/***/ }),

/***/ 756:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    toolbar: {
      buttons: [
        { module: 'test-wxwork', name: 'buttonTest' },
        { module: 'a-layoutmobile', name: 'buttonAppHome' },
        { module: 'a-layoutmobile', name: 'buttonAppMine' },
      ],
    },
  };
  const layout = {
    atomName: 'Test Layout(Wechat Work)',
    atomStaticKey: 'layoutTest',
    atomRevision: 5,
    description: '',
    layoutTypeCode: 1,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};


/***/ }),

/***/ 512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const layoutTest = __webpack_require__(756);
const layoutAppMenuTest = __webpack_require__(192);

module.exports = app => {
  const layouts = [
    //
    layoutTest(app),
    layoutAppMenuTest(app),
  ];
  return layouts;
};


/***/ }),

/***/ 429:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // tabbar buttons
    {
      atomName: 'Test',
      description: 'Tabbar Button: Test(Wechat Work)',
      atomStaticKey: 'buttonTest',
      atomRevision: -1,
      atomCategoryId: 'a-layoutmobile:button.General',
      resourceType: 'a-layoutmobile:button',
      resourceConfig: JSON.stringify({
        module: 'a-layoutmobile',
        component: 'buttonLink',
        icon: { f7: '::group-work' },
        url: '/test/wxwork/test/index',
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};


/***/ }),

/***/ 821:
/***/ ((module) => {

module.exports = app => {
  class TestController extends app.Controller {
    async getMemberId() {
      const res = await this.service.test.getMemberId({
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }

    async sendAppMessage() {
      const res = await this.service.test.sendAppMessage({
        message: this.ctx.request.body.message,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }
  return TestController;
};


/***/ }),

/***/ 95:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const test = __webpack_require__(821);

module.exports = app => {
  const controllers = {
    test,
  };
  return controllers;
};


/***/ }),

/***/ 421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const config = __webpack_require__(76);
const locales = __webpack_require__(25);
const errors = __webpack_require__(624);

module.exports = app => {
  // beans
  const beans = __webpack_require__(187)(app);
  // routes
  const routes = __webpack_require__(825)(app);
  // controllers
  const controllers = __webpack_require__(95)(app);
  // services
  const services = __webpack_require__(214)(app);
  // models
  const models = __webpack_require__(230)(app);
  // meta
  const meta = __webpack_require__(458)(app);

  return {
    beans,
    routes,
    controllers,
    services,
    models,
    config,
    locales,
    errors,
    meta,
  };
};


/***/ }),

/***/ 458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = app => {
  // const schemas = require('./config/validation/schemas.js')(app);
  const staticApps = __webpack_require__(241)(app);
  const staticLayouts = __webpack_require__(512)(app);
  const staticResources = __webpack_require__(429)(app);
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


/***/ }),

/***/ 230:
/***/ ((module) => {

module.exports = app => {
  const models = {};
  return models;
};


/***/ }),

/***/ 825:
/***/ ((module) => {

module.exports = app => {
  const routes = [
    // test
    {
      method: 'post',
      path: 'test/getMemberId',
      controller: 'test',
      middlewares: 'inWxwork',
      meta: {
        inWxwork: [
          {
            providerName: 'wxwork',
            providerScene: null,
          },
          {
            providerName: 'wxworkmini',
            providerScene: null,
          },
        ],
      },
    },
    {
      method: 'post',
      path: 'test/sendAppMessage',
      controller: 'test',
      middlewares: 'inWxwork',
      meta: {
        inWxwork: [
          {
            providerName: 'wxwork',
            providerScene: null,
          },
          {
            providerName: 'wxworkmini',
            providerScene: null,
          },
        ],
      },
    },
  ];
  return routes;
};


/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = app => {
  class Test extends app.Service {
    async getMemberId({ user }) {
      const modelMember = this.ctx.model.module('a-wxwork').member;
      const member = await modelMember.get({ userId: user.id });
      return {
        memberId: member.memberId,
      };
    }

    async sendAppMessage({ message, user }) {
      const content = {
        userIds: [user.id],
        data: {
          msgtype: 'text',
          text: {
            content: message.text,
          },
        },
      };
      await this.ctx.bean.io.pushDirect({
        content,
        channel: { module: 'a-wxwork', name: 'app' },
      });
    }
  }

  return Test;
};


/***/ }),

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const test = __webpack_require__(618);

module.exports = app => {
  const services = {
    test,
  };
  return services;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(421);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=backend.js.map