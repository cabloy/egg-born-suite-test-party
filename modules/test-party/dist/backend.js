/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1644:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');
const objectHash = __webpack_require__(7551);

module.exports = ctx => {
  class Atom {
    async create(context, next) {
      await next();
      assert.equal(!!context.result, true);
    }
    async _submitDirect(context, next) {
      await next();
      assert.equal(!!context.result, true);
    }
  }

  return Atom;
};


/***/ }),

/***/ 287:
/***/ ((module) => {

module.exports = ctx => {
  class regExpAop {
    get__name(context, next) {
      next();
      context.value = `${context.value}:regexpaop`;
    }

    set__name(context, next) {
      const parts = context.value.split(':');
      const index = parts.indexOf('regexpaop');
      if (index > -1) {
        parts.splice(index, 1);
      }
      context.value = parts.join(':');
      next();
    }

    actionSync(context, next) {
      next();
      context.result = `${context.result}:regexpaop`;
    }

    async actionAsync(context, next) {
      await next();
      context.result = `${context.result}:regexpaop`;
    }
  }

  return regExpAop;
};


/***/ }),

/***/ 2594:
/***/ ((module) => {

class simpleAopBase {
  actionSync(context, next) {
    next();
    context.result = `${context.result}:simpleaop`;
  }
}

module.exports = ctx => {
  class simpleAop extends simpleAopBase {
    // magic
    get__magic__(context, next) {
      next();
      const prop = context.prop;
      if (prop === 'magic') {
        context.value = 'magic:simpleaop';
      }
    }

    get__name(context, next) {
      next();
      context.value = `${context.value}:simpleaop`;
    }

    set__name(context, next) {
      const parts = context.value.split(':');
      const index = parts.indexOf('simpleaop');
      if (index > -1) {
        parts.splice(index, 1);
      }
      context.value = parts.join(':');
      next();
    }

    async actionAsync(context, next) {
      await next();
      context.result = `${context.result}:simpleaop`;
    }
  }

  return simpleAop;
};


/***/ }),

/***/ 5224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const regExp = __webpack_require__(287);
const simple = __webpack_require__(2594);
const atom = __webpack_require__(1644);

module.exports = app => {
  const aops = {};
  Object.assign(aops, {
    simple: {
      match: 'testctx',
      mode: 'ctx',
      bean: simple,
    },
    regExp: {
      match: [/^test-party.test\.\w+$/, 'testctx'],
      mode: 'ctx',
      bean: regExp,
    },
  });
  if (app.meta.isTest) {
    Object.assign(aops, {
      atom: {
        match: 'atom',
        mode: 'ctx',
        bean: atom,
      },
    });
  }
  return aops;
};


/***/ }),

/***/ 6118:
/***/ ((module) => {

module.exports = app => {
  class Atom extends app.meta.AtomCmsBase {
    async create({ atomClass, item, options, user }) {
      // super
      const key = await super.create({ atomClass, item, options, user });
      // add party
      const res = await this.ctx.model.party.insert({
        atomId: key.atomId,
      });
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async read({ atomClass, options, key, user }) {
      // super
      const item = await super.read({ atomClass, options, key, user });
      if (!item) return null;
      // read
      await this._translate(item);
      await this._getMeta(item, options);
      // ok
      return item;
    }

    async select({ atomClass, options, items, user }) {
      // super
      await super.select({ atomClass, options, items, user });
      // select
      for (const item of items) {
        await this._translate(item);
        await this._getMeta(item, options);
      }
    }

    async write({ atomClass, target, key, item, options, user }) {
      // super
      await super.write({ atomClass, target, key, item, options, user });
      // update party
      const data = await this.ctx.model.party.prepareData(item);
      await this.ctx.model.party.update(data);
    }

    async delete({ atomClass, key, options, user }) {
      // super
      await super.delete({ atomClass, key, options, user });
      // delete party
      await this.ctx.model.party.delete({
        id: key.itemId,
      });
    }

    async checkRightAction({ atom, atomClass, action, options, user }) {
      // super
      const res = await super.checkRightAction({ atom, atomClass, action, options, user });
      if (!res) return res;
      if (atom.atomStage !== 1) return res;
      if (action !== 101) return res;
      // partyOver
      const item = await this.ctx.model.party.get({ id: atom.itemId });
      if (action === 101 && item.partyOver === 0) return res;
      return null;
    }

    async _translateDictPartyCountry({ partyCountry }) {
      // dictKey
      if (partyCountry !== '1' && partyCountry !== '86') return null;
      // findItem
      return await this.ctx.bean.dict.findItem({
        dictKey: 'a-dictbooster:countries',
        code: partyCountry,
      });
    }

    async _translateDictPartyCity({ partyCountry, partyCity }) {
      if (partyCountry !== '1' && partyCountry !== '86') return null;
      if (!partyCity) return null;
      // findItem
      const dictKey = partyCountry === '1' ? 'a-dictbooster:citiesUSA' : 'a-dictbooster:citiesChina';
      return await this.ctx.bean.dict.findItem({
        dictKey,
        code: partyCity,
        options: { separator: '/' },
      });
    }

    async _translate(item) {
      const dictItem = await this._translateDictPartyCity({
        partyCountry: item.partyCountry,
        partyCity: item.partyCity,
      });
      if (dictItem) {
        item._partyCityTitle = dictItem.titleFull;
        item._partyCityTitleLocale = dictItem.titleLocaleFull;
      }
    }

    async _getMeta(item, options) {
      // layout: list/table/mobile/pc
      const layout = options && options.layout;
      // meta
      const meta = this._ensureItemMeta(item);
      // meta.flags
      if (item.partyOver) {
        meta.flags.push(this.ctx.text('PartyOverFlag'));
      }
      if (layout !== 'table' && item.personCount) {
        meta.flags.push(item.personCount + 'P');
      }
      // meta.summary
      if (item.partyTypeCode) {
        const dictItem = await this.ctx.bean.dict.findItem({
          dictKey: 'test-party:dictPartyType',
          code: item.partyTypeCode,
        });
        if (layout !== 'table') {
          meta.summary = `${dictItem.options.emoji}${dictItem.titleLocaleFull}`;
        }
      }
    }
  }

  return Atom;
};


/***/ }),

/***/ 333:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class Broadcast extends app.meta.BeanBase {
    async execute(context) {
      const sameAsCaller = context.sameAsCaller;
      const data = context.data;
      if (!sameAsCaller) {
        // do something
      }
      // locale
      assert.equal(this.ctx.locale, 'zh-cn');
      // data
      assert.equal(data.message, 'hello');
    }
  }

  return Broadcast;
};


/***/ }),

/***/ 5561:
/***/ ((module) => {

module.exports = ctx => {
  class Cli extends ctx.app.meta.CliBase(ctx) {
    async meta({ user }) {
      const meta = await super.meta({ user });
      return meta;
    }
    async execute({ user }) {
      // super
      await super.execute({ user });
      // chalk
      let text = this.helper.chalk.keyword('orange')('chalk test');
      await this.console.log({ text });
      // boxen
      text = this.helper.boxen({ text: 'boxen test' });
      await this.console.log({ text });
      // table
      const table = this.helper.newTable({
        head: ['Name', 'Sex'],
        colWidths: [20, 20],
      });
      table.push(['Tom', 'M']);
      table.push(['Jane', 'F']);
      await this.console.log({ text: 'table test' });
      await this.console.log({ text: table.toString() });
      //  level one
      await this._levelOne({ progressNo: 0 });
    }

    async _levelOne({ progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${ctx.text('Level One')}: ${i + 1}`;
        await this.console.log({
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await ctx.bean.util.sleep(200);
        // level two
        await this._levelTwo({ progressNo: progressNo + 1 });
      }
    }

    async _levelTwo({ progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${ctx.text('Level Two')}: ${i + 1}`;
        await this.console.log({
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await ctx.bean.util.sleep(200);
        // level two
        await this._levelThree({ progressNo: progressNo + 1 });
      }
    }

    async _levelThree({ progressNo }) {
      const total = 3;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${ctx.text('Level Three')}: ${i + 1}`;
        await this.console.log({
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await ctx.bean.util.sleep(200);
      }
    }
  }

  return Cli;
};


/***/ }),

/***/ 7229:
/***/ ((module) => {

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      data.text = 'hello echo';
      context.result = `${context.result}.echo`;
      await next();
      context.result = `echo.${context.result}`;
    }
  }

  return EventBean;
};


/***/ }),

/***/ 6427:
/***/ ((module) => {

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      const info = data.info;
      const provider = info.user && info.user.provider;
      if (provider && provider.module === 'a-authgithub' && provider.providerName === 'authgithub') {
        info.config = ctx.bean.util.extend(info.config, {
          modules: {},
        });
      }
      // next
      await next();
    }
  }

  return EventBean;
};


/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      const info = data.info;
      info.config = ctx.bean.util.extend(info.config, {
        modules: {},
      });
      // next
      await next();
    }
  }

  return EventBean;
};


/***/ }),

/***/ 398:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      assert(data.profileUser.profileId > 0);
      // next
      await next();
    }
  }

  return EventBean;
};


/***/ }),

/***/ 3558:
/***/ ((module) => {

module.exports = ctx => {
  class IOMessage extends ctx.app.meta.IOMessageBase(ctx) {}
  return IOMessage;
};


/***/ }),

/***/ 5558:
/***/ ((module) => {

module.exports = ctx => {
  class IOMessage extends ctx.app.meta.IOMessageBase(ctx) {
    async onSaveSync({ path, options, message, messageSync, messageClass }) {
      // options
      const messageScene = (options && options.scene) || '';
      // send back
      if (messageSync.messageDirection === 1 && message.userIdTo === 0) {
        const content = JSON.parse(message.content);
        const _message = {
          messageType: message.messageType,
          messageFilter: message.messageFilter,
          messageGroup: message.messageGroup,
          messageScene,
          userIdFrom: 0,
          userIdTo: messageSync.userId,
          content: {
            text: `Reply: ${content.text}`,
          },
        };
        await ctx.bean.io.publish({ path, message: _message, messageClass, options });
      }
      return await super.onSaveSync({ path, options, message, messageSync, messageClass });
    }
  }
  return IOMessage;
};


/***/ }),

/***/ 95:
/***/ ((module) => {

module.exports = ctx => {
  class LocalTest {
    get name() {
      return 'localTest';
    }
  }

  return LocalTest;
};


/***/ }),

/***/ 8997:
/***/ ((module) => {

module.exports = ctx => {
  class Middleware {
    async execute(options, next) {
      const { a, b } = ctx.request.body;
      if (a === undefined || b === undefined) return ctx.throw(1002); // 1002: 'Incomplete Parameters'
      // next
      await next();
    }
  }
  return Middleware;
};


/***/ }),

/***/ 8120:
/***/ ((module) => {

module.exports = ctx => {
  class Middleware {
    async execute(options, next) {
      const { a, b } = ctx.request.body;
      ctx.request.body.a = parseInt(a);
      ctx.request.body.b = parseInt(b);
      // next
      await next();
    }
  }
  return Middleware;
};


/***/ }),

/***/ 3929:
/***/ ((module) => {

module.exports = app => {
  class Queue extends app.meta.BeanBase {
    async execute(context) {
      const data = context.data;
      return data.a + data.b;
    }
  }

  return Queue;
};


/***/ }),

/***/ 770:
/***/ ((module) => {

module.exports = app => {
  class Schedule extends app.meta.BeanBase {
    async execute(context) {
      const job = context.job;
      console.log(
        `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job.data.jobOptions.repeat.every}, ${new Date()}`
      );
    }
  }

  return Schedule;
};


/***/ }),

/***/ 7679:
/***/ ((module) => {

module.exports = ctx => {
  class Sequence {
    async execute(context) {
      let value = context.value;
      return ++value;
    }
  }

  return Sequence;
};


/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class Startup extends app.meta.BeanBase {
    async execute() {
      console.log('test/feat/startup: all');
      assert.equal(this.ctx.instance, undefined);
    }
  }

  return Startup;
};


/***/ }),

/***/ 3310:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class Startup extends app.meta.BeanBase {
    async execute() {
      console.log(`test/feat/startup: instance:${this.ctx.instance.id}`);
      assert(this.ctx.instance.id > 0);
    }
  }

  return Startup;
};


/***/ }),

/***/ 7477:
/***/ ((module) => {

module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class Stats {
    async execute(context) {
      const { keys } = context;
      const fullName = keys.join('.');
      const valueOld = await ctx.bean.stats._get({
        module: moduleInfo.relativeName,
        fullName,
      });
      if (valueOld === undefined) return 1;
      return valueOld + 1;
    }
  }

  return Stats;
};


/***/ }),

/***/ 5268:
/***/ ((module) => {

module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class Stats {
    async execute(context) {
      const { keys, user } = context;
      const fullName = keys.join('.');
      const valueOld = await ctx.bean.stats._get({
        module: moduleInfo.relativeName,
        fullName,
        user,
      });
      if (valueOld === undefined) return 1;
      return valueOld + 1;
    }
  }

  return Stats;
};


/***/ }),

/***/ 9711:
/***/ ((module) => {

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SummerCache {
    constructor({ cacheBase }) {
      this._cacheBase = cacheBase;
    }

    async get(key) {
      return {
        id: key.id,
        name: `name_${key.id}`,
      };
    }
  }

  return SummerCache;
};


/***/ }),

/***/ 8713:
/***/ ((module) => {

module.exports = app => {
  class appBean extends app.meta.BeanBase {
    actionSync({ a, b }) {
      return a + b;
    }

    async actionAsync({ a, b }) {
      return Promise.resolve(a + b);
    }
  }

  return appBean;
};


/***/ }),

/***/ 5811:
/***/ ((module) => {

class classBeanBase {
  constructor(ctx) {
    this.ctx = ctx;
  }

  actionSync({ a, b }) {
    return a + b;
  }
}

class classBean extends classBeanBase {
  async actionAsync({ a, b }) {
    return Promise.resolve(a + b);
  }
}

module.exports = classBean;


/***/ }),

/***/ 3774:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ctx_0 = __webpack_require__(7791);
const ctx_1 = __webpack_require__(1107);

module.exports = ctx => {
  return ctx.app.meta.util.mixinClasses(ctx_0, ctx_1, ctx);
};


/***/ }),

/***/ 7791:
/***/ ((module) => {

module.exports = ctx => {
  class ctxBean {
    constructor(moduleName) {
      this._name = moduleName || ctx.module.info.relativeName;
    }

    get name() {
      return this._name;
    }

    set name(value) {
      this._name = value;
    }

    actionSync({ a, b }) {
      return a + b;
    }

    async actionAsync({ a, b }) {
      return Promise.resolve(a + b);
    }

    async actionAsync2({ a, b }) {
      const name = this.name;
      const value = await this.actionAsync({ a, b });
      return `${name}:${value}`;
    }
  }

  return ctxBean;
};


/***/ }),

/***/ 1107:
/***/ ((module) => {

module.exports = ctx => {
  class ctxBean {
    async actionAsync3({ a, b }) {
      return await this.actionAsync2({ a, b });
    }
  }

  return ctxBean;
};


/***/ }),

/***/ 6899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fileVersionUpdates = [1, 2];
const fileVersionInits = [1];

module.exports = app => {
  class Version extends app.meta.BeanBase {
    async update(options) {
      if (fileVersionUpdates.includes(options.version)) {
        const VersionUpdateFn = __webpack_require__(9380)(`./update${options.version}.js`);
        const versionUpdate = new (VersionUpdateFn(this.ctx))();
        await versionUpdate.run(options);
      }
    }

    async init(options) {
      if (fileVersionInits.includes(options.version)) {
        const VersionInitFn = __webpack_require__(692)(`./init${options.version}.js`);
        const versionInit = new (VersionInitFn(this.ctx))();
        await versionInit.run(options);
      }
    }

    async test() {
      const VersionTestFn = __webpack_require__(5293);
      const versionTest = new (VersionTestFn(this.ctx))();
      await versionTest.run();
    }
  }

  return Version;
};


/***/ }),

/***/ 3355:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const testData = __webpack_require__(6742);

module.exports = function (ctx) {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionInit {
    async run(options) {
      await this._init_rights();
      await this._init_testData();
    }

    async _init_rights() {
      // // types
      // for (const name of ['Birthday', 'Dance', 'Garden']) {
      //   await ctx.model.partyType.insert({ name });
      // }
      // add role rights
      const roleRights = [
        // basic
        { roleName: 'system', action: 'create' },
        { roleName: 'system', action: 'read', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'write', scopeNames: 0 },
        { roleName: 'system', action: 'delete', scopeNames: 0 },
        { roleName: 'system', action: 'clone', scopeNames: 0 },
        { roleName: 'system', action: 'deleteBulk' },
        { roleName: 'system', action: 'exportBulk' },
        // special for cms
        { roleName: 'anonymous', action: 'read', scopeNames: 'authenticated' },
        // custom
        { roleName: 'system', action: 'partyOver', scopeNames: 0 },
        { roleName: 'system', action: 'partyOverBulk' },
      ];
      await ctx.bean.role.addRoleRightBatch({ atomClassName: 'party', roleRights });
    }

    async _init_testData() {
      // roles
      const roleIds = await this._testRoles();

      // role includes
      await this._testRoleIncs(roleIds);

      // set role dirty
      await ctx.bean.role.setDirty(true);

      // users
      const userIds = await this._testUsers(roleIds);

      // role rights
      await this._testRoleRights(roleIds);

      // cache
      this._testCache(roleIds, userIds);
    }

    _testCache(roleIds, userIds) {
      // cache roles
      ctx.cache.mem.set('roleIds', roleIds);
      // cache users
      ctx.cache.mem.set('userIds', userIds);
    }

    // roles
    async _testRoles() {
      const roleIds = {};
      // system roles
      for (const roleName of ctx.constant.module('a-base').systemRoles) {
        const role = await ctx.bean.role.getSystemRole({ roleName });
        roleIds[roleName] = role.id;
      }
      // roles
      for (const [roleName, leader, catalog, roleNameParent] of testData.roles) {
        roleIds[roleName] = await ctx.bean.role.add({
          module: moduleInfo.relativeName,
          roleName,
          leader,
          catalog,
          roleIdParent: roleIds[roleNameParent],
        });
      }

      return roleIds;
    }

    // role incs
    async _testRoleIncs(roleIds) {
      for (const [roleId, roleIdInc] of testData.roleIncs) {
        await ctx.bean.role.addRoleInc({
          roleId: roleIds[roleId],
          roleIdInc: roleIds[roleIdInc],
        });
      }
    }

    // users
    async _testUsers(roleIds) {
      // userIds
      const userIds = {};
      for (const [userName, roleName] of testData.users) {
        // add
        if (!userIds[userName]) {
          userIds[userName] = await ctx.bean.user.add({
            userName,
            realName: userName,
          });
          // activated
          await ctx.bean.user.save({
            user: { id: userIds[userName], activated: 1 },
          });
        }
        // role
        await ctx.bean.role.addUserRole({
          userId: userIds[userName],
          roleId: roleIds[roleName],
        });
      }

      // auths
      await this._testAuths(userIds);

      // root
      const userRoot = await ctx.bean.user.get({ userName: 'root' });
      userIds.root = userRoot.id;
      return userIds;
    }

    // role rights
    async _testRoleRights() {
      // atomClass: party
      await ctx.bean.role.addRoleRightBatch({ atomClassName: 'party', roleRights: testData.roleRights });
      // atomClass: role
      await ctx.bean.role.addRoleRightBatch({
        module: 'a-base',
        atomClassName: 'role',
        roleRights: testData.roleRightsRole,
      });
      // atomClass: user
      await ctx.bean.role.addRoleRightBatch({
        module: 'a-base',
        atomClassName: 'user',
        roleRights: testData.roleRightsUser,
      });
    }

    // auths
    async _testAuths(userIds) {
      for (const userName in userIds) {
        await ctx.bean.authSimple.add({
          userId: userIds[userName],
          password: '',
        });
      }
    }
  }

  return VersionInit;
};


/***/ }),

/***/ 692:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./init1.js": 3355
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 692;

/***/ }),

/***/ 5293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const testData = __webpack_require__(6742);

module.exports = function (ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionTest {
    async run(options) {
      // role rights
      await this._testRoleRights();
      // role resource rights
      await this._testRoleResources();
    }

    // role rights
    async _testRoleRights() {
      // // atomClass: role
      // await ctx.bean.role.addRoleRightBatch({
      //   module: 'a-base',
      //   atomClassName: 'role',
      //   roleRights: testData.roleRightsRole,
      // });
    }

    // role resource rights
    async _testRoleResources() {
      await ctx.bean.resource.addRoleResourceBatch({
        roleResources: testData.roleResources,
      });
    }
  }

  return VersionTest;
};


/***/ }),

/***/ 6742:
/***/ ((module) => {

// roleName, leader, catalog, roleNameParent
const roles = [
  ['friend', 0, 0, 'external'],
  ['consultant', 0, 1, 'external'],
  ['study', 0, 0, 'consultant'],
  ['work', 0, 0, 'consultant'],
  ['life', 0, 0, 'consultant'],
  ['family', 0, 1, 'internal'],
  ['father', 0, 0, 'family'],
  ['mother', 1, 0, 'family'],
  ['son', 0, 0, 'family'],
  ['daughter', 0, 0, 'family'],
];

// friend->family
const roleIncs = [['friend', 'family']];

// family and friend
//   userName, roleName
const users = [
  ['Tom', 'father'],
  ['Jane', 'mother'],
  ['Tomson', 'son'],
  ['Jannie', 'daughter'],
  ['Jimmy', 'friend'],
  ['Rose', 'friend'],
  ['Smith', 'life'],
  ['Jone', 'work'],
];

// roleRights
const roleRights = [
  { roleName: 'family', action: 'create' },
  { roleName: 'family', action: 'read', scopeNames: 'family' },
  { roleName: 'authenticated', action: 'read', scopeNames: 0 },
  { roleName: 'authenticated', action: 'write', scopeNames: 0 },
  { roleName: 'authenticated', action: 'delete', scopeNames: 0 },
  { roleName: 'consultant', action: 'read', scopeNames: 'family' },
  //
  { roleName: 'RoleScopeCliDevelopment', action: 'create' },
  { roleName: 'RoleScopeCliDevelopment', action: 'read' },
  { roleName: 'RoleScopeCliDevelopment', action: 'write' },
  { roleName: 'RoleScopeCliDevelopment', action: 'delete' },
  { roleName: 'RoleScopeCliDevelopment', action: 'partyOverBulk' },
];

const roleResources = [
  //
  { roleName: 'father', atomStaticKey: 'a-baseadmin:roleManagement' },
];

const roleRightsRole = [
  // { roleName: 'father', action: 'create' },
  { roleName: 'father', action: 'read', scopeNames: 'organization' },
  { roleName: 'father', action: 'write', scopeNames: 'organization' },
  { roleName: 'father', action: 'delete', scopeNames: 'organization' },
  { roleName: 'father', action: 'clone', scopeNames: 'organization' },
  { roleName: 'father', action: 'move', scopeNames: 'organization' },
  { roleName: 'father', action: 'addChild', scopeNames: 'organization' },
  { roleName: 'father', action: 'roleUsers', scopeNames: 'organization' },
  { roleName: 'father', action: 'includes', scopeNames: 'organization' },
  { roleName: 'father', action: 'resourceAuthorizations', scopeNames: 'organization' },
  { roleName: 'father', action: 'atomAuthorizations', scopeNames: 'organization' },
];

const roleRightsUser = [
  // { roleName: 'father', action: 'create' },
  { roleName: 'father', action: 'read', scopeNames: 'organization' },
  { roleName: 'father', action: 'write', scopeNames: 'organization' },
  // { roleName: 'father', action: 'delete', scopeNames: 'organization' },
  { roleName: 'father', action: 'enable', scopeNames: 'organization' },
  { roleName: 'father', action: 'disable', scopeNames: 'organization' },
  { roleName: 'father', action: 'userRoles', scopeNames: 'organization' },
  { roleName: 'father', action: 'resourceAuthorizations', scopeNames: 'organization' },
  { roleName: 'father', action: 'atomAuthorizations', scopeNames: 'organization' },
];

module.exports = {
  roles,
  roleIncs,
  users,
  roleRights,
  roleRightsRole,
  roleRightsUser,
  roleResources,
};


/***/ }),

/***/ 2367:
/***/ ((module) => {

module.exports = function SelfFactory(ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionUpdate {
    async run(options) {
      let sql = `
          CREATE TABLE testParty (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            personCount int(11) DEFAULT '0',
            partyTypeId int(11) DEFAULT '0',
            partyOver int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
      await ctx.model.query(sql);

      sql = `
          CREATE TABLE testPartyType (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            name varchar(255) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `;
      await ctx.model.query(sql);

      sql = `
          CREATE VIEW testPartyView as
            select a.*,b.name as partyTypeName from testParty a
              left join testPartyType b on a.partyTypeId=b.id
        `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};


/***/ }),

/***/ 6366:
/***/ ((module) => {

module.exports = function SelfFactory(ctx) {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionUpdate {
    async run(options) {
      // drop view: testPartyView
      await ctx.model.query('drop view testPartyView');
      // drop table: testPartyType
      await ctx.model.query('drop table testPartyType');
      // partyTypeId->partyTypeCode
      const sql = `
        ALTER TABLE testParty
          CHANGE COLUMN partyTypeId partyTypeCode INT(11) DEFAULT '0',
          ADD COLUMN partyTime timestamp DEFAULT NULL,
          ADD COLUMN partyCountry varchar(50) DEFAULT '',
          ADD COLUMN partyCity varchar(50) DEFAULT ''
      `;
      await ctx.model.query(sql);
    }
  }

  return VersionUpdate;
};


/***/ }),

/***/ 9380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./update1.js": 2367,
	"./update2.js": 6366
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9380;

/***/ }),

/***/ 5187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versionManager = __webpack_require__(6899);
const cliDefaultDemo = __webpack_require__(5561);
const testApp = __webpack_require__(8713);
const testClass = __webpack_require__(5811);
const testCtx = __webpack_require__(3774);
const localTest = __webpack_require__(95);
const eventHelloEcho = __webpack_require__(7229);
const eventUserVerify = __webpack_require__(398);
const eventLoginInfo = __webpack_require__(6427);
const eventLoginInfoDashboard = __webpack_require__(8020);
const broadcastTest = __webpack_require__(333);
const queueTest = __webpack_require__(3929);
const scheduleTest = __webpack_require__(770);
const startupStartupAll = __webpack_require__(940);
const startupStartupInstance = __webpack_require__(3310);
const middlewareTestInterception = __webpack_require__(8997);
const middlewareTestRestructuring = __webpack_require__(8120);
const atomParty = __webpack_require__(6118);
const ioMessageTest = __webpack_require__(5558);
const ioMessageSimpleChat = __webpack_require__(3558);
const sequenceTest = __webpack_require__(7679);
const statsTasksUser = __webpack_require__(5268);
const statsTasksInstance = __webpack_require__(7477);
const summerCacheTest = __webpack_require__(9711);

module.exports = app => {
  const beans = {
    // version
    'version.manager': {
      mode: 'app',
      bean: versionManager,
    },
  };
  Object.assign(beans, {
    // cli
    'cli.default.demo': {
      mode: 'ctx',
      bean: cliDefaultDemo,
    },
    // test
    'test.app': {
      mode: 'app',
      bean: testApp,
    },
    'test.class': {
      mode: 'app',
      bean: testClass,
    },
    testctx: {
      mode: 'ctx',
      bean: testCtx,
      global: true,
    },
    'local.test': {
      mode: 'ctx',
      bean: localTest,
    },
    // event
    'event.helloEcho': {
      mode: 'ctx',
      bean: eventHelloEcho,
    },
    'event.userVerify': {
      mode: 'ctx',
      bean: eventUserVerify,
    },
    'event.loginInfo': {
      mode: 'ctx',
      bean: eventLoginInfo,
    },
    'event.loginInfoDashboard': {
      mode: 'ctx',
      bean: eventLoginInfoDashboard,
    },
    // broadcast
    'broadcast.test': {
      mode: 'app',
      bean: broadcastTest,
    },
    // queue
    'queue.test': {
      mode: 'app',
      bean: queueTest,
    },
    // schedule
    'schedule.test': {
      mode: 'app',
      bean: scheduleTest,
    },
    // startup
    'startup.startupAll': {
      mode: 'app',
      bean: startupStartupAll,
    },
    'startup.startupInstance': {
      mode: 'app',
      bean: startupStartupInstance,
    },
    // middleware
    'middleware.testInterception': {
      mode: 'ctx',
      bean: middlewareTestInterception,
    },
    'middleware.testRestructuring': {
      mode: 'ctx',
      bean: middlewareTestRestructuring,
    },
    // atom
    'atom.party': {
      mode: 'app',
      bean: atomParty,
    },
    // io
    'io.message.test': {
      mode: 'ctx',
      bean: ioMessageTest,
    },
    'io.message.simpleChat': {
      mode: 'ctx',
      bean: ioMessageSimpleChat,
    },
    // sequence
    'sequence.test': {
      mode: 'ctx',
      bean: sequenceTest,
    },
    // stats
    'stats.tasksUser': {
      mode: 'ctx',
      bean: statsTasksUser,
    },
    'stats.tasksInstance': {
      mode: 'ctx',
      bean: statsTasksInstance,
    },
    // summer
    'summer.cache.test': {
      mode: 'ctx',
      bean: summerCacheTest,
    },
  });

  return beans;
};


/***/ }),

/***/ 3917:
/***/ ((module) => {

module.exports = app => {
  return {
    bean: 'default.demo',
    resource: {
      atomStaticKey: 'cliDefaultDemo',
    },
    info: {
      version: '4.0.0',
      title: 'Cli Demo',
      welcomes: 'This is a test',
    },
    options: {
      username: {
        description: 'Your username',
        alias: 'u',
        type: 'string',
      },
      role: {
        description: 'Your role',
        alias: 'r',
        type: 'string',
      },
      course: {
        description: 'Your course',
        alias: 'c',
        type: 'string',
      },
      grade: {
        description: 'Your grade',
        alias: 'g',
        type: 'string',
      },
    },
    groups: {
      default: {
        description: 'Your basic info',
        condition: {
          expression: null,
        },
        questions: {
          username: {
            type: 'input',
            message: 'Your username',
          },
          role: {
            type: 'select',
            message: 'Your role',
            choices: ['teacher', 'student'],
          },
        },
      },
      teacher: {
        description: 'The teacher info',
        condition: {
          expression: 'context.argv.role==="teacher"',
        },
        questions: {
          course: {
            type: 'input',
            message: 'Your course',
          },
        },
      },
      student: {
        description: 'The student info',
        condition: {
          expression: 'context.argv.role==="student"',
        },
        questions: {
          grade: {
            type: 'input',
            message: 'Your grade',
          },
        },
      },
    },
  };
};


/***/ }),

/***/ 4407:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const defaultDemo = __webpack_require__(3917);

module.exports = app => {
  const commands = {
    default: {
      demo: defaultDemo(app),
    },
  };
  return commands;
};


/***/ }),

/***/ 7076:
/***/ ((module) => {

// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};

  if (appInfo.env === 'unittest') {
    // startups
    config.startups = {
      startupAll: {
        bean: 'startupAll',
      },
      startupInstance: {
        bean: 'startupInstance',
        instance: true,
      },
    };
    // queues
    config.queues = {
      queueTest: {
        bean: 'test',
      },
    };
    // broadcasts
    config.broadcasts = {
      broadcastTest: {
        bean: 'test',
      },
    };
    // monkey
    config.monkeyed = false;
  }

  // config
  config.message = 'Hello World';

  // middlewares
  config.middlewares = {
    testInterception: {
      bean: 'testInterception',
      global: false,
      dependencies: 'instance',
    },
    testRestructuring: {
      bean: 'testRestructuring',
      global: false,
      dependencies: 'instance',
    },
  };

  // schedules
  config.schedules = {
    test: {
      bean: 'test',
      repeat: {
        every: 3000,
      },
      disable: true,
    },
  };

  // summer
  config.summer = {
    caches: {
      test: {
        bean: 'test',
        mode: 'all', // mem/redis/all
        mem: {
          max: 2,
          ttl: 1 * 1000,
        },
        redis: {
          ttl: 3 * 1000,
        },
      },
    },
  };

  // settings
  config.settings = {
    instance: {
      groupInfo: {
        slogan: '',
      },
    },
    user: {
      groupInfo: {
        username: 'zhennann',
      },
      groupExtra: {
        panelExtra: {
          groupInfo: {
            mobile: '123',
            sex: 1,
            language: 'en-us',
          },
        },
      },
    },
  };

  // captcha scenes
  const _captchaSMS = {
    module: 'a-authsms',
    name: 'captcha',
  };
  config.captcha = {
    scenes: {
      formMobileVerifyTest: _captchaSMS,
      formCaptchaTest: null, // means using default
      // formCaptchaTest: {
      //   module: 'a-captchasimple',
      //   name: 'captcha',
      // },
    },
  };

  // cms site
  config.cms = {};
  config.cms.sites = {};
  config.cms.sites.party = {
    base: {
      title: 'Party',
      subTitle: 'Test',
      description: '',
      keywords: '',
    },
    host: {
      url: 'http://example.com',
      rootPath: '',
    },
    language: false,
    themes: {
      default: 'test-party',
    },
    edit: {
      mode: 0, // custom
    },
    env: {
      format: {
        date: 'YYYY-MM-DD',
        time: 'HH:mm:ss',
      },
      article2: {
        recentNum: 5,
      },
      comment: {
        order: 'asc',
        recentNum: 5,
      },
      brother: {
        order: 'desc',
      },
      loadMore: {
        loadOnScroll: false,
      },
    },
  };

  return config;
};


/***/ }),

/***/ 5624:
/***/ ((module) => {

// error code should start from 1001
module.exports = {
  1001: 'Error Test',
  1002: 'Incomplete Parameters',
};


/***/ }),

/***/ 7487:
/***/ ((module) => {

module.exports = {
  default: 'birthday,dance,garden',
};


/***/ }),

/***/ 6327:
/***/ ((module) => {

module.exports = {
  PartyOver: 'Party Over',
  PartyOverFlag: 'Over',
  OpenIsolateApp: 'Open Isolate App',
  OpenIsolateAppParty: 'Open Isolate App (Party)',
  DianCaiWechat: 'Wechat Ordering',
  UIComponents: 'UI Components',
};


/***/ }),

/***/ 3072:
/***/ ((module) => {

module.exports = {
  Party: '宴会',
  Review: '审核',
  Reviewing: '审核中',
  Reviewed: '已审核',
  Item: '条目',
  Products: '产品',
  Snapshots: '快照',
  About: '关于',
  Demonstration: '演示',
  PartyOver: '宴会结束',
  PartyOverFlag: '已结束',
  OpenIsolateApp: '打开独立应用',
  OpenIsolateAppParty: '打开独立应用（宴会）',
  DianCaiWechat: '微信点菜',
  UIComponents: 'UI组件',
  Guide: '指南',
  Components: '组件',
  'Home(Test)': '首页（测试）',
  'Dashboard(Test)': '仪表板（测试）',
  'Party Test': '宴会测试',
  'Party Name': '宴会名称',
  'Person Count': '人数',
  'Party Type': '宴会类型',
  'Create Party': '新建宴会',
  'Party List': '宴会列表',
  'Level One': '层级1',
  'Level Two': '层级2',
  'Level Three': '层级3',
  'Well Done': '干得好',
  'Error Test': '错误测试',
  'Hello World': '世界，您好',
  'Fruit Sales': '水果销量',
  'Fruit Sales(Line Chart)': '水果销量（折线图）',
  'Fruit Sales(Pie Chart)': '水果销量（饼图）',
  'Article Comment Count': '文章评论数',
  'Cli Demo': 'Cli演示',
  'Your username': '您的名称',
  'Your role': '您的角色',
  'Your course': '您的课程',
  'Your grade': '您的年级',
  'Your basic info': '您的基本信息',
  'The teacher info': '教师信息',
  'The student info': '学生信息',
  'This is a test': '这是一个测试',
  'Simple Chat': '简单聊天',
  // role name
  friend: '朋友',
  consultant: '咨询',
  study: '学习',
  work: '工作',
  life: '生活',
  family: '家庭',
  father: '父亲',
  mother: '母亲',
  son: '儿子',
  daughter: '女儿',
};


/***/ }),

/***/ 25:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  'en-us': __webpack_require__(6327),
  'zh-cn': __webpack_require__(3072),
};


/***/ }),

/***/ 2513:
/***/ ((module) => {

module.exports = app => {
  const simpleChat = {
    info: {
      bean: 'simpleChat',
      title: 'Simple Chat',
      persistence: true,
      push: {
        channels: false,
      },
    },
  };
  return simpleChat;
};


/***/ }),

/***/ 4160:
/***/ ((module) => {

module.exports = app => {
  const test = {
    info: {
      bean: 'test',
      title: 'Test',
      persistence: true,
      push: {
        channels: false,
      },
    },
  };
  return test;
};


/***/ }),

/***/ 1258:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const info = {};
  const content = {
    presets: {
      anonymous: {
        mobile: info,
        pc: info,
      },
      authenticated: {
        mobile: info,
        pc: info,
      },
    },
  };
  const _app = {
    atomName: 'UIComponents',
    atomStaticKey: 'appComponents',
    atomRevision: 0,
    atomCategoryId: 'Demonstration',
    description: '',
    appIcon: ':business:kitchen-set',
    appIsolate: false,
    content: JSON.stringify(content),
    resourceRoles: 'root',
    appSorting: 0,
  };
  return _app;
};


/***/ }),

/***/ 1979:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const info = {
    // layout: null,
    // menu: {
    //   layout: null,
    // },
    home: {
      mode: 'dashboard', // dashboard/page
      dashboard: 'test-party:dashboardTest',
      page: null,
    },
    mine: {
      layout: true,
    },
  };
  const content = {
    presets: {
      anonymous: {
        mobile: info,
        pc: info,
      },
      authenticated: {
        mobile: info,
        pc: info,
      },
    },
  };
  const _app = {
    atomName: 'Party',
    atomStaticKey: 'appParty',
    atomRevision: 2,
    atomCategoryId: 'Demonstration',
    description: '',
    appIcon: ':business:party',
    appIsolate: false,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};


/***/ }),

/***/ 8241:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const appParty = __webpack_require__(1979);
const appComponents = __webpack_require__(1258);

module.exports = app => {
  const apps = [
    //
    appParty(app),
    appComponents(app),
  ];
  return apps;
};


/***/ }),

/***/ 2589:
/***/ ((module) => {

const content = {
  root: {
    id: 'e341b99ef3bc495db8a8c09e6ad6203e',
    widgets: [
      {
        id: 'a0031e5e2aef421f8434856512dec714',
        name: 'widgetSales',
        module: 'test-party',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '7aefb0431ef24996ba35b596b53372e7',
        group: true,
        widgets: [
          {
            id: 'fe96b7ede7f5480a9590e92184272455',
            name: 'widgetSalesLine',
            module: 'test-party',
            properties: {
              fruit: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'fruit',
                },
                type: 2,
              },
              title: {
                type: 1,
                value: '',
              },
              height: {
                type: 1,
                value: 'auto',
              },
              dataSource: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'dataSource',
                },
                type: 2,
              },
              widthLarge: {
                type: 1,
                value: 100,
              },
              widthSmall: {
                type: 1,
                value: 100,
              },
              widthMedium: {
                type: 1,
                value: 100,
              },
            },
          },
          {
            id: '9ee4b1234b4a477890ce094e8eb5e332',
            name: 'widgetSalesPie',
            module: 'test-party',
            properties: {
              title: {
                type: 1,
                value: '',
              },
              height: {
                type: 1,
                value: 'auto',
              },
              season: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'season',
                },
                type: 2,
              },
              dataSource: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'dataSource',
                },
                type: 2,
              },
              widthLarge: {
                type: 1,
                value: 100,
              },
              widthSmall: {
                type: 1,
                value: 100,
              },
              widthMedium: {
                type: 1,
                value: 100,
              },
            },
          },
        ],
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '64f7c356b78f45799e4b3072af73866e',
        name: 'widgetSnapshot',
        module: 'test-party',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          snapshots: {
            type: 2,
            binds: [
              {
                id: 'fb3eac5b678e488cb4da60a2bddb0f60',
                widgetId: 'fe96b7ede7f5480a9590e92184272455',
                propertyName: 'snapshot',
              },
              {
                id: '40b8e8ea3007418992f0489cba98129e',
                widgetId: '9ee4b1234b4a477890ce094e8eb5e332',
                propertyName: 'snapshot',
              },
            ],
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '8a04bfa743fb42b2a65a104e018ab924',
        name: 'widgetAbout',
        module: 'a-dashboard',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
    ],
  },
};

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const dashboard = {
    atomName: 'Dashboard(Test)',
    atomStaticKey: 'dashboardTest',
    atomRevision: 1,
    description: '',
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return dashboard;
};


/***/ }),

/***/ 4790:
/***/ ((module) => {

const content = {
  root: {
    id: 'e341b99ef3bc495db8a8c09e6ad6203f',
    widgets: [
      {
        atomStaticKey: 'test-note:widgetNote',
        id: '878d9687921641de880b130fa0ff5fd0',
        properties: {
          demoKey: {
            type: 1,
            value: 'demo-1',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        atomStaticKey: 'test-note:widgetNote',
        id: '688725d1c2a446fea402580a5af072da',
        properties: {
          demoKey: {
            type: 1,
            value: 'demo-2',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        atomStaticKey: 'test-party:widgetSimpleChat',
        id: '650acfa718f645098bf0516628d678f0',
        properties: {
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        id: '8a04bfa743fb42b2a65a104e018ab924',
        module: 'a-dashboard',
        name: 'widgetAbout',
        properties: {
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
    ],
  },
};

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const dashboard = {
    atomName: 'Home(Test)',
    atomStaticKey: 'homeTest',
    atomRevision: 11,
    description: '',
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return dashboard;
};


/***/ }),

/***/ 3937:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dashboardTest = __webpack_require__(2589);
const homeTest = __webpack_require__(4790);

module.exports = app => {
  const dashboards = [
    dashboardTest(app), //
    homeTest(app),
  ];
  return dashboards;
};


/***/ }),

/***/ 4013:
/***/ ((module) => {

module.exports = app => {
  const dictItems = [
    {
      code: 1,
      name: 'birthday',
      title: 'Birthday',
      options: {
        emoji: '🎂',
        icon: { f7: 'test-party::birthday' },
      },
    },
    {
      code: 2,
      name: 'dance',
      title: 'Dance',
      options: {
        emoji: '💃',
        icon: { f7: 'test-party::dance' },
      },
    },
    {
      code: 3,
      name: 'garden',
      title: 'Garden',
      options: {
        emoji: '🏡',
        icon: { f7: 'test-party::garden' },
      },
    },
  ];
  const dictLocales = {
    'zh-cn': {
      Birthday: '生日',
      Dance: '跳舞',
      Garden: '花园',
    },
  };
  const dict = {
    atomName: 'Party Type',
    atomStaticKey: 'dictPartyType',
    atomRevision: 1,
    description: '',
    dictItems: JSON.stringify(dictItems),
    dictLocales: JSON.stringify(dictLocales),
    resourceRoles: 'root',
  };
  return dict;
};


/***/ }),

/***/ 3715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const partyType = __webpack_require__(4013);

module.exports = app => {
  const dicts = [
    partyType(app), //
  ];
  return dicts;
};


/***/ }),

/***/ 1536:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    info: {
      layout: {
        viewSize: {
          view: {
            small: 'default',
            medium: 'default',
            large: 'default',
          },
          edit: {
            small: 'default',
            medium: 'default',
            large: 'default',
          },
        },
      },
    },
    layouts: {},
  };
  const layout = {
    atomName: 'Party',
    atomStaticKey: 'layoutAtomItemParty',
    atomRevision: 0,
    description: '',
    layoutTypeCode: 4,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};


/***/ }),

/***/ 1063:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    info: {
      orders: [
        { name: 'partyTypeCode', title: 'Party Type' },
        { name: 'personCount', title: 'Person Count', by: 'asc' },
      ],
    },
    layouts: {
      list: {
        blocks: {
          // title: false,
        },
      },
      table: {
        blocks: {
          items: {
            columns: [
              {
                dataIndex: 'atomName',
                title: 'Atom Name',
                align: 'left',
                renderType: 'atomName',
              },
              {
                dataIndex: 'partyTypeCode',
                title: 'Party Type',
                align: 'left',
                renderType: 'dict',
              },
              {
                dataIndex: 'partyTime',
                title: 'Party Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: '_partyCityTitleLocale',
                title: 'Party City',
                align: 'left',
              },
              {
                dataIndex: 'personCount',
                title: 'Person Count',
                align: 'left',
              },
              {
                dataIndex: 'userIdCreated',
                title: 'Creator',
                align: 'left',
                renderType: 'userName',
              },
              {
                dataIndex: 'atomCreatedAt',
                title: 'Created Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: 'atomUpdatedAt',
                title: 'Modification Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'Party',
    atomStaticKey: 'layoutAtomListParty',
    atomRevision: 5,
    description: '',
    layoutTypeCode: 3,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};


/***/ }),

/***/ 3512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const layoutAtomListParty = __webpack_require__(1063);
const layoutAtomItemParty = __webpack_require__(1536);
// const layoutAppMineParty = require('./layout/layoutAppMineParty.js');

module.exports = app => {
  const layouts = [
    //
    layoutAtomListParty(app),
    layoutAtomItemParty(app),
    // layoutAppMineParty(app),
  ];
  return layouts;
};


/***/ }),

/***/ 2159:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    {
      atomName: 'Article Comment Count',
      atomStaticKey: 'blockArticleCommentCount',
      atomRevision: 0,
      atomCategoryId: 'a-markdown:block.Demonstration',
      resourceType: 'a-markdown:block',
      resourceConfig: JSON.stringify({
        default: {
          interval: 1000,
        },
        validator: {
          module: moduleInfo.relativeName,
          validator: 'blockArticleCommentCount',
        },
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};


/***/ }),

/***/ 8537:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // menu
    {
      atomName: 'Kitchen-sink',
      atomStaticKey: 'kitchenSink',
      atomRevision: -1,
      atomCategoryId: 'a-base:menu.Tools',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index',
      }),
      resourceIcon: ':business:kitchen-set',
      appKey: 'test-party:appParty',
      resourceRoles: 'root,RoleScopeCliDevelopment',
      resourceSorting: 1,
    },
  ];
  return resources;
};


/***/ }),

/***/ 1850:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // function
    {
      atomName: 'Cli Demo',
      atomStaticKey: 'cliDefaultDemo',
      atomRevision: 1,
      atomCategoryId: 'a-base:function.Cli',
      resourceType: 'a-base:function',
      resourceConfig: null,
      resourceRoles: 'template.system,RoleScopeCliDevelopment',
    },
  ];
  return resources;
};


/***/ }),

/***/ 8748:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    //
    {
      atomName: 'Create Party',
      atomStaticKey: 'createParty',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'create',
      }),
      resourceIcon: '::add',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,family',
    },
    {
      atomName: 'Party List',
      atomStaticKey: 'listParty',
      atomRevision: 3,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'read',
      }),
      resourceIcon: ':outline:data-list-outline',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,authenticated',
    },
    //
    {
      atomName: 'Party',
      atomStaticKey: 'openIsolateAppParty',
      atomRevision: 9,
      atomCategoryId: 'a-base:menu.OpenIsolateApp',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: 'a-app',
        actionComponent: 'actionTools',
        name: 'openApp',
        appKey: 'test-party:appParty',
        appLanguage: null,
        appIsolate: true,
        external: true,
        target: '_blank',
      }),
      resourceIcon: '::open-in-new',
      appKey: 'test-party:appParty',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
    // app: appComponents
    {
      atomName: 'About',
      atomStaticKey: 'appComponentsAbout',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.General',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionPath: '/a/basefront/base/about',
      }),
      resourceIcon: '::information',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 1,
    },
    {
      atomName: 'Guide',
      atomStaticKey: 'appComponentsGuide',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.General',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/guide',
      }),
      resourceIcon: '::book',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
    {
      atomName: 'CabloyJS',
      atomStaticKey: 'appComponentsCabloyJS',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.Components',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index?mode=2',
      }),
      resourceIcon: '::cabloy',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 1,
    },
    {
      atomName: 'Framework7',
      atomStaticKey: 'appComponentsFramework7',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.Components',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/framework7/index',
      }),
      resourceIcon: ':social:framework7',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
  ];
  return resources;
};


/***/ }),

/***/ 4562:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    {
      atomName: 'Kitchen-sink',
      atomStaticKey: 'mineKitchenSink',
      atomRevision: 1,
      atomCategoryId: 'a-base:mine.Tools',
      resourceType: 'a-base:mine',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index',
      }),
      resourceIcon: ':business:kitchen-set',
      appKey: 'test-party:appParty',
      resourceRoles: 'root,RoleScopeCliDevelopment',
      resourceSorting: 1,
    },
  ];
  return resources;
};


/***/ }),

/***/ 6944:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    {
      atomName: 'Fruit Sales',
      atomStaticKey: 'widgetSales',
      atomRevision: 0,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSales',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'Fruit Sales(Line Chart)',
      atomStaticKey: 'widgetSalesLine',
      atomRevision: 0,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSalesLine',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'Fruit Sales(Pie Chart)',
      atomStaticKey: 'widgetSalesPie',
      atomRevision: 0,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSalesPie',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'Snapshots',
      atomStaticKey: 'widgetSnapshot',
      atomRevision: 0,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSnapshot',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'About',
      atomStaticKey: 'widgetAbout',
      atomRevision: 0,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetAbout',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'Simple Chat',
      atomStaticKey: 'widgetSimpleChat',
      atomRevision: 20,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSimpleChat',
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};


/***/ }),

/***/ 5429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const functions = __webpack_require__(1850);
const menus = __webpack_require__(8748);
const mines = __webpack_require__(4562);
const widgets = __webpack_require__(6944);
const blocks = __webpack_require__(2159);
const deprecateds = __webpack_require__(8537);

module.exports = app => {
  let resources = [];
  resources = resources.concat(functions(app));
  resources = resources.concat(menus(app));
  resources = resources.concat(mines(app));
  resources = resources.concat(widgets(app));
  resources = resources.concat(blocks(app));
  resources = resources.concat(deprecateds(app));
  return resources;
};


/***/ }),

/***/ 5835:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const __rolesAll = [
    { atomName: 'friend', roleTypeCode: 1 },
    { atomName: 'consultant', roleTypeCode: 1 },
    { atomName: 'study', roleTypeCode: 2 },
    { atomName: 'work', roleTypeCode: 2 },
    { atomName: 'life', roleTypeCode: 2 },
    { atomName: 'family', roleTypeCode: 1 },
    { atomName: 'father', roleTypeCode: 4 },
    { atomName: 'mother', roleTypeCode: 4 },
    { atomName: 'son', roleTypeCode: 4 },
    { atomName: 'daughter', roleTypeCode: 4 },
  ];
  const roles = [];
  for (const __role of __rolesAll) {
    roles.push({
      atomName: __role.atomName,
      atomStaticKey: `role_${__role.atomName}`,
      atomRevision: 1,
      description: '',
      roleTypeCode: __role.roleTypeCode,
      resourceRoles: 'template.system',
    });
  }
  // ok
  return roles;
};


/***/ }),

/***/ 2415:
/***/ ((module) => {

module.exports = app => {
  const keywords = {};
  keywords.languages = {
    async: true,
    type: 'string',
    errors: true,
    compile(/* sch, parentSchema*/) {
      return async function (data) {
        const ctx = this;
        const locales = ctx.bean.base.locales();
        const index = locales.findIndex(item => item.value === data);
        if (index > -1) return true;
        const errors = [{ keyword: 'x-languages', params: [], message: ctx.text('Not Expected Value') }];
        throw new app.meta.ajv.ValidationError(errors);
      };
    },
  };
  return keywords;
};


/***/ }),

/***/ 607:
/***/ ((module) => {

module.exports = app => {
  const schemas = {};
  // blockArticleCommentCount
  schemas.blockArticleCommentCount = {
    type: 'object',
    properties: {
      interval: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'IntervalMS',
        notEmpty: true,
      },
    },
  };
  return schemas;
};


/***/ }),

/***/ 7429:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const schemas = {};
  // formTest
  schemas.formTest = {
    type: 'object',
    properties: {
      __groupInfo: {
        ebType: 'group-flatten',
        ebTitle: 'Info Group',
      },
      userName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Username',
        ebDescription: 'Your Name',
        ebHelp: 'Please type your name',
        notEmpty: true,
      },
      password: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      passwordAgain: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Password Again',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        const: { $data: '1/password' },
      },
      sex: {
        type: 'number',
        ebType: 'select',
        ebTitle: 'Sex',
        ebMultiple: false,
        ebOptions: [
          { title: 'Male', value: 1 },
          { title: 'Female', value: 2 },
        ],
        ebOptionsBlankAuto: true,
        ebParams: {
          openIn: 'sheet',
          closeOnSelect: true,
        },
        notEmpty: true,
      },
      rememberMe: {
        type: 'boolean',
        ebType: 'toggle',
        ebTitle: 'Remember Me',
      },
      __groupExtra: {
        ebType: 'group-flatten',
        ebTitle: 'Extra Group',
      },
      birthday: {
        type: ['object', 'null'],
        ebType: 'datePicker',
        ebTitle: 'Birthday',
        ebParams: {
          dateFormat: 'YYYY-MM-DD',
          header: false,
          toolbar: true,
          // backdrop: true,
        },
        // format: 'date-time',
        notEmpty: true,
        'x-date': true,
      },
      language: {
        type: 'string',
        ebType: 'select',
        ebTitle: 'Language',
        ebOptionsUrl: '/a/base/base/locales',
        ebOptionsUrlParams: null,
        ebOptionsBlankAuto: true,
        ebParams: {
          openIn: 'sheet',
          closeOnSelect: true,
        },
        'x-languages': true,
        // notEmpty: true,
      },
      avatar: {
        type: 'string',
        ebType: 'image',
        ebTitle: 'Avatar',
        ebParams: {
          fixed: {
            width: 96,
            height: 96,
          },
        },
        notEmpty: true,
      },
      motto: {
        type: 'string',
        ebType: 'component',
        ebRender: {
          module: moduleInfo.relativeName,
          name: 'renderMotto',
          options: {
            props: {
              height: '100px',
            },
          },
        },
        notEmpty: true,
      },
      selfIntroduction: {
        type: 'string',
        ebType: 'markdown',
        ebTitle: 'SelfIntroduction',
      },
    },
  };
  // formCaptchaTest
  schemas.formCaptchaTest = {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Username',
        notEmpty: true,
      },
      password: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
    },
  };
  // formMobileVerifyTest
  schemas.formMobileVerifyTest = {
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
        ebType: 'text',
        ebParams: {
          inputType: 'tel',
        },
        ebTitle: 'Phone Number',
        notEmpty: true,
      },
    },
  };
  return schemas;
};


/***/ }),

/***/ 5304:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const schemas = {};
  // party
  schemas.party = {
    type: 'object',
    properties: {
      // Basic Info
      __groupBasicInfo: {
        ebType: 'group-flatten',
        ebTitle: 'Basic Info',
      },
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Party Name',
        notEmpty: true,
      },
      personCount: {
        type: 'integer',
        ebType: 'text',
        ebTitle: 'Person Count',
        minimum: 1,
        notEmpty: true,
      },
      partyTypeCode: {
        type: 'number',
        ebType: 'dict',
        ebTitle: 'Party Type',
        ebParams: {
          dictKey: 'test-party:dictPartyType',
          mode: 'tree',
        },
        notEmpty: true,
      },
      partyTime: {
        type: ['object', 'null'],
        ebType: 'datePicker',
        ebTitle: 'Party Time',
        ebParams: {
          timePicker: true,
          dateFormat: 'YYYY-MM-DD HH:mm:00',
          header: false,
          toolbar: true,
        },
        notEmpty: true,
        'x-date': true,
      },
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
          leafOnly: true,
        },
      },
      // Extra
      __groupExtra: {
        ebType: 'group-flatten',
        ebTitle: 'Extra',
      },
      atomCategoryId: {
        type: 'number',
        ebType: 'category',
        ebTitle: 'Category',
      },
      atomTags: {
        type: ['string', 'null'],
        ebType: 'tags',
        ebTitle: 'Tags',
      },
      partyOver: {
        ebType: 'toggle',
        ebTitle: 'PartyOver',
        ebDisplay: {
          // expression: 'status===0',
          // dependencies: ['status'],
          host: {
            stage: 'formal',
            // mode: 'view',
          },
        },
        ebReadOnly: true,
      },
    },
  };
  // party search
  schemas.partySearch = {
    type: 'object',
    properties: {
      partyTypeCode: {
        type: 'number',
        ebType: 'dict',
        ebTitle: 'Party Type',
        ebParams: {
          dictKey: 'test-party:dictPartyType',
          mode: 'tree',
        },
        ebOptionsBlankAuto: true,
      },
      partyTime: {
        type: 'string',
        ebType: 'dateRange',
        ebTitle: 'Party Time',
        ebParams: {
          dateFormat: 'YYYY-MM-DD',
          header: false,
          toolbar: true,
        },
        ebSearch: {
          combine: {
            actionModule: 'a-basefront',
            actionComponent: 'combineSearch',
            name: 'dateRange',
          },
        },
      },
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
        ebSearch: {
          operators: 'likeRight',
        },
      },
    },
  };
  return schemas;
};


/***/ }),

/***/ 3754:
/***/ ((module) => {

module.exports = app => {
  const schemas = {};
  // settings
  schemas.settingsUser = {
    type: 'object',
    properties: {
      _myInfo_: {
        // not set 'type', so as not to post back to the backend
        ebType: 'text',
        ebTitle: 'My Info',
        ebComputed: {
          expression: 'groupInfo.username + "(" + (groupExtra.panelExtra.groupInfo.mobile || "-") + ")"',
          dependencies: ['groupInfo.username', 'groupExtra.panelExtra.groupInfo.mobile'],
          immediate: true,
        },
        ebReadOnly: true,
      },
      groupInfo: {
        type: 'object',
        ebType: 'group',
        ebTitle: 'Info Group',
        properties: {
          username: {
            type: 'string',
            ebType: 'text',
            ebTitle: 'My Name',
            notEmpty: true,
          },
        },
      },
      groupExtra: {
        type: 'object',
        ebType: 'group',
        ebTitle: 'Extra Group',
        properties: {
          panelExtra: {
            type: 'object',
            ebType: 'panel',
            ebTitle: 'Extra',
            $ref: 'settingsUserExtra',
          },
        },
      },
    },
  };
  schemas.settingsUserExtra = {
    type: 'object',
    properties: {
      groupInfo: {
        type: 'object',
        ebType: 'group',
        ebTitle: 'Info Group',
        ebGroupWhole: true,
        properties: {
          mobile: {
            type: 'string',
            ebType: 'text',
            ebTitle: 'Mobile',
            notEmpty: true,
          },
          sex: {
            type: 'number',
            ebType: 'select',
            ebTitle: 'Sex',
            ebMultiple: false,
            ebOptions: [
              { title: 'Male', value: 1 },
              { title: 'Female', value: 2 },
            ],
            ebParams: {
              openIn: 'page',
              closeOnSelect: true,
            },
            notEmpty: true,
          },
          language: {
            type: 'string',
            ebType: 'select',
            ebTitle: 'Language',
            ebOptionsUrl: '/a/base/base/locales',
            ebOptionsUrlParams: null,
            'x-languages': true,
            notEmpty: true,
          },
        },
      },
    },
  };
  schemas.settingsInstance = {
    type: 'object',
    properties: {
      groupInfo: {
        type: 'object',
        ebType: 'group',
        ebTitle: 'Info Group',
        properties: {
          slogan: {
            type: 'string',
            ebType: 'text',
            ebTitle: 'Slogan',
            notEmpty: true,
          },
        },
      },
    },
  };
  return schemas;
};


/***/ }),

/***/ 8232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const blocks = __webpack_require__(607);
const formTest = __webpack_require__(7429);
const party = __webpack_require__(5304);
const settings = __webpack_require__(3754);

module.exports = app => {
  const schemas = {};
  // blocks
  Object.assign(schemas, blocks(app));
  // formTest
  Object.assign(schemas, formTest(app));
  // party
  Object.assign(schemas, party(app));
  // settings
  Object.assign(schemas, settings(app));
  // ok
  return schemas;
};


/***/ }),

/***/ 7361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const languages = __webpack_require__(3614);

module.exports = app => {
  class AutocompleteController extends app.Controller {
    async languages() {
      const query = this.ctx.params.query;
      let data;
      if (!query) {
        data = [];
      } else {
        data = languages.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) === 0;
        });
      }
      this.ctx.success(data);
    }
  }

  return AutocompleteController;
};


/***/ }),

/***/ 8664:
/***/ ((module) => {

const __ItemDefault = {
  userName: '',
  password: '',
  passwordAgain: '',
  sex: 0,
  birthday: null,
  language: '',
  avatar: '',
  rememberMe: false,
  motto: '',
};

module.exports = app => {
  class FormSchemaValidationController extends app.Controller {
    async load() {
      // try load from db cache
      const cacheName = this._getCacheName();
      let item = await this.ctx.cache.db.get(cacheName);
      item = this.ctx.bean.util.extend({}, __ItemDefault, item);
      // ok
      this.ctx.success(item);
    }

    async saveSimple() {
      // item
      const item = this.ctx.request.body.data;
      // save to db cache
      const cacheName = this._getCacheName();
      await this.ctx.cache.db.set(cacheName, item);
      // ok
      this.ctx.success();
    }

    async saveValidation() {
      await this.saveSimple();
    }

    // form-captcha signup
    signup() {
      this.ctx.success();
    }

    // form-mobile-verify
    mobileVerify() {
      this.ctx.success();
    }

    _getCacheName() {
      // get the operation user
      const user = this.ctx.state.user.op;
      return `__formTest:${user.id}`;
    }
  }

  return FormSchemaValidationController;
};


/***/ }),

/***/ 7350:
/***/ ((module) => {

module.exports = app => {
  class GuideController extends app.Controller {
    async echo() {
      const message = 'Hello World';
      this.ctx.success(message);
    }

    async echo2() {
      const message = this.ctx.config.message;
      this.ctx.success(message);
    }

    async echo3() {
      const message = this.ctx.text('Hello World');
      this.ctx.success(message);
    }

    async echo4() {
      const { message, markCount } = this.ctx.request.body;
      const res = `${message}${new Array(markCount + 1).join('!')}`;
      this.ctx.success(res);
    }

    async echo6() {
      // testParty: insert/udpate/delete/get

      // insert
      const res = await this.ctx.db.insert('testParty', {
        iid: this.ctx.instance.id,
        deleted: 0,
        personCount: 3,
      });
      const id = res.insertId;
      // update
      await this.ctx.db.update('testParty', {
        id,
        personCount: 5,
      });
      // get
      const item = await this.ctx.db.get('testParty', {
        id,
      });
      // delete
      await this.ctx.db.delete('testParty', {
        id,
      });
      // ok
      this.ctx.success(item);
    }

    async echo7() {
      // testParty: insert/udpate/delete/get

      // insert
      const res = await this.ctx.model.party.insert({ personCount: 3 });
      const id = res.insertId;
      // update
      await this.ctx.model.party.update({ id, personCount: 6 });
      // get
      const item = await this.ctx.model.party.get({ id });
      // delete
      await this.ctx.model.party.delete({ id });
      // ok
      this.ctx.success(item);
    }

    async echo8() {
      // transaction

      // insert
      const res = await this.ctx.model.party.insert({ personCount: 3 });
      const id = res.insertId;
      // will throw error
      await this.ctx.model.party.update({ id, personCountA: 6 });
      // never here
      this.ctx.success();
    }

    async echo9() {
      // Menu Authorization
      // ok
      this.ctx.success('ok');
    }
  }

  return GuideController;
};


/***/ }),

/***/ 7708:
/***/ ((module) => {

const gTestListMax = 89;

module.exports = app => {
  class PtrIsLoadMoreController extends app.Controller {
    async list() {
      // page
      let page = this.ctx.request.body.page;
      // adjust page
      page = this.ctx.bean.util.page(page, false);
      // items
      const items = [];
      for (let i = 0; i < page.size; i++) {
        const itemId = page.index + i + 1;
        if (itemId > gTestListMax) break;
        items.push({
          id: itemId,
          title: `${this.ctx.text('Item')} - ${itemId}`,
        });
      }
      // ok
      this.ctx.successMore(items, page.index, page.size);
    }
  }

  return PtrIsLoadMoreController;
};


/***/ }),

/***/ 1653:
/***/ ((module) => {

module.exports = app => {
  class PartyController extends app.Controller {
    async over() {
      const res = await this.ctx.service.party.over({
        key: this.ctx.request.body.key,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }

    async overBulk() {
      const res = await this.ctx.service.party.overBulk({
        keys: this.ctx.request.body.keys,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }

  return PartyController;
};


/***/ }),

/***/ 9503:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class AllController extends app.Controller {
    async all() {
      const totalTimes = 1;
      const timeStart = new Date().getTime() / 1000;
      for (let i = 0; i < totalTimes; i++) {
        await this.__all();
        console.log(`-----all time: ${i}`);
      }
      const timeEnd = new Date().getTime() / 1000;
      console.log(`-----all time used: ${timeEnd - timeStart}s`);
      // done
      this.ctx.success();
    }
    async __all() {
      // atomClass
      const atomClass = await this.ctx.bean.atomClass.get({ atomClassName: 'party' });
      this.atomClass = atomClass;
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userTom = await this._getUser({ userIds, userName: 'Tom' });
      // user->atom
      await this._testCheckList(
        'formal',
        userIds,
        [
          ['Tom', 0],
          ['Jane', 0],
          ['Jimmy', 0],
          ['Smith', 0],
          ['', 0],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );

      // Tom add party
      const partyKeyDraft = await this.ctx.bean.atom.create({
        atomClass,
        options: { preferredRole: true },
        user: userTom,
      });
      await this.ctx.bean.atom.write({
        key: partyKeyDraft,
        item: { atomName: 'test:all', personCount: 3 },
        user: userTom,
      });

      await this._testCheckList(
        'draft',
        userIds,
        [
          ['Tom', 1],
          ['Jane', 0],
          ['Jimmy', 0],
          ['Smith', 0],
          ['', 0],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );

      // Tom enable(submit) party
      const res = await this.ctx.bean.atom.submit({
        key: partyKeyDraft,
        options: { ignoreFlow: true },
        user: userTom,
      });
      const partyKeyFormal = res.formal.key;

      await this._testCheckList(
        'formal',
        userIds,
        [
          ['Tom', 1],
          ['Jane', 1],
          ['Jimmy', 1],
          ['Smith', 1],
          ['', 1],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );

      // Tom update party
      await this.ctx.bean.atom.write({
        key: partyKeyDraft,
        item: { personCount: 8 },
        user: userTom,
      });

      // Tom get party
      const party = await this.ctx.bean.atom.read({ key: partyKeyDraft, user: userTom });
      assert.equal(party.personCount, 8);

      // Tom list party
      const parties = await this.ctx.bean.atom.select({
        atomClass,
        options: {
          where: { atomName: { val: 'test:all', op: 'likeRight' } },
          orders: [['a.createdAt', 'desc']],
          page: { index: 0, size: 0 },
          stage: 'formal',
        },
        user: userTom,
      });
      assert.equal(parties.length, 1);

      // checkRightRead
      const checkRightReads = [['Tom', partyKeyFormal.atomId, true]];
      for (const [userName, atomId, right] of checkRightReads) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightRead({
          atom: { id: atomId },
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightWrite
      const checkRightWrites = [
        ['Tom', partyKeyFormal.atomId, true],
        ['Tomson', partyKeyFormal.atomId, false],
      ];
      for (const [userName, atomId, right] of checkRightWrites) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightAction({
          atom: { id: atomId },
          action: 'write',
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightDelete
      const checkRightDeletes = [
        ['Tom', partyKeyFormal.atomId, true],
        ['Tomson', partyKeyFormal.atomId, false],
      ];
      for (const [userName, atomId, right] of checkRightDeletes) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightAction({
          atom: { id: atomId },
          action: 'delete',
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightCreate
      const checkRightCreates = [
        ['Tom', true],
        ['Jimmy', true],
        ['Smith', false],
      ];
      for (const [userName, right] of checkRightCreates) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightCreate({
          atomClass,
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // // checkRightAction:review(flag=1)
      // const checkRightActions_1 = [[ 'Tom', partyKey.atomId, false ], [ 'Jane', partyKey.atomId, true ]];
      // for (const [ userName, atomId, right ] of checkRightActions_1) {
      //   const res = await this.ctx.bean.atom.checkRightAction({
      //     atom: { id: atomId },
      //     action: 101,
      //     user: { id: userIds[userName] },
      //   });
      //   assert.equal(!!res, right, userName);
      // }

      // // action: review
      // await this.ctx.bean.atom.action({
      //   action: 101,
      //   key: partyKey,
      //   user: { id: userIds.Jane },
      // });

      // // checkRightAction:review(flag=2)
      // const checkRightActions_2 = [[ 'Tom', partyKey.atomId, false ], [ 'Jane', partyKey.atomId, false ]];
      // for (const [ userName, atomId, right ] of checkRightActions_2) {
      //   const res = await this.ctx.bean.atom.checkRightAction({
      //     atom: { id: atomId },
      //     action: 101,
      //     user: { id: userIds[userName] },
      //   });
      //   assert.equal(!!res, right, userName);
      // }

      // // action: review again
      // await this.ctx.bean.atom.action({
      //   action: 101,
      //   key: partyKey,
      //   user: { id: userIds.Jane },
      // });

      // Tom delete party
      await this.ctx.bean.atom.delete({
        key: partyKeyFormal,
        user: userTom,
      });

      await this._testCheckList(
        'formal',
        userIds,
        [
          ['Tom', 0],
          ['Jane', 0],
          ['Jimmy', 0],
          ['Smith', 0],
          ['', 0],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );
    }

    async _testCheckList(stage, userIds, userAtoms, cb) {
      for (const [userName, atomCountExpected] of userAtoms) {
        const user = await this._getUser({ userIds, userName });
        const list = await this.ctx.bean.atom.select({
          atomClass: this.atomClass,
          options: {
            where: {
              atomName: 'test:all',
            },
            orders: null,
            page: null,
            stage,
          },
          user,
        });
        // callback
        cb(list.length, atomCountExpected, userName);
      }
    }

    async _getUser({ userIds, userName }) {
      if (!userName) return null;
      const userId = userIds && userIds[userName];
      if (userId) return { id: userId };
      return await this.ctx.bean.user.get({ userName });
    }
  }

  return AllController;
};


/***/ }),

/***/ 9754:
/***/ ((module) => {

module.exports = app => {
  class RightController extends app.Controller {
    async checkRightCreate() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.atomClass);
    }

    async checkRightRead() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async checkRightWrite() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async checkRightAction() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }
  }

  return RightController;
};


/***/ }),

/***/ 421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class StarLabelController extends app.Controller {
    async starLabel() {
      // atomClass
      const atomClass = await this.ctx.bean.atomClass.get({ atomClassName: 'party' });
      // user
      const user = this.ctx.state.user.op;

      // add party:star
      const partyKeyDraft = await this.ctx.bean.atom.create({
        atomClass,
        options: { preferredRole: true },
        user,
      });

      // write party
      await this.ctx.bean.atom.write({
        key: partyKeyDraft,
        item: { atomName: 'test:starLabel' },
        user,
      });

      // submit party
      const res = await this.ctx.bean.atom.submit({
        key: partyKeyDraft,
        options: { ignoreFlow: true },
        user,
      });
      const partyKeyFormal = res.formal.key;

      // get party
      let party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
      assert.equal(party.star, null);
      assert.equal(party.labels, null);

      // set star/label
      await this.ctx.bean.atom.star({ key: partyKeyFormal, atom: { star: 1 }, user });
      await this.ctx.bean.atom.labels({ key: partyKeyFormal, atom: { labels: [1] }, user });

      // get party
      party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
      assert.equal(party.star, 1);
      assert.equal(party.labels, '[1]');

      // select parties
      let parties = await this.ctx.bean.atom.select({
        user,
        options: {
          star: 1,
          where: { atomName: 'test:starLabel' },
          stage: 'formal',
        },
      });
      assert.equal(parties.length, 1);

      parties = await this.ctx.bean.atom.select({
        user,
        options: {
          label: 1,
          where: { atomName: 'test:starLabel' },
          stage: 'formal',
        },
      });
      assert.equal(parties.length, 1);

      parties = await this.ctx.bean.atom.select({
        user,
        options: {
          label: 2,
          where: { atomName: 'test:starLabel' },
          stage: 'formal',
        },
      });
      assert.equal(parties.length, 0);

      // clear star/label
      await this.ctx.bean.atom.star({ key: partyKeyFormal, atom: { star: 0 }, user });
      await this.ctx.bean.atom.labels({ key: partyKeyFormal, atom: { labels: null }, user });

      // get party
      party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
      assert.equal(party.star, null);
      assert.equal(party.labels, null);

      // delete party
      await this.ctx.bean.atom.delete({ key: partyKeyFormal, user });

      // done
      this.ctx.success();
    }
  }

  return StarLabelController;
};


/***/ }),

/***/ 6720:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class DbController extends app.Controller {
    async db() {
      let res;
      let value;

      // name
      const name = '__test:name:db';

      // getset
      value = await this.ctx.cache._db.getset(name, 'zhen.nann');
      assert.equal(value, undefined);

      value = await this.ctx.cache._db.getset(name, 'zhennann');
      assert.equal(value, 'zhen.nann');

      // has
      res = await this.ctx.cache._db.has(name);
      assert.equal(res, true);

      // get
      value = await this.ctx.cache._db.get(name);
      assert.equal(value, 'zhennann');

      // remove
      await this.ctx.cache._db.remove(name);
      res = await this.ctx.cache._db.has(name);
      assert.equal(res, false);

      // set with timeout
      await this.ctx.cache._db.set(name, 'zhennann', 2000);

      // get
      value = await this.ctx.cache._db.get(name);
      assert.equal(value, 'zhennann');

      // other module's cache
      const moduleCache = this.ctx.cache._db.module(this.ctx.module.info.relativeName);
      value = await moduleCache.get(name);
      assert.equal(value, 'zhennann');

      // get after timeout
      await sleep(3000);
      value = await this.ctx.cache._db.get(name);
      assert.equal(value, undefined);

      // done
      this.ctx.success();
    }
  }
  return DbController;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),

/***/ 1308:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class MemController extends app.Controller {
    async mem() {
      let res;
      let value;

      // name
      const name = '__test:name:mem';

      // set
      value = this.ctx.cache.mem.getset(name, 'zhen.nann');
      assert.equal(value, undefined);

      value = this.ctx.cache.mem.getset(name, 'zhennann');
      assert.equal(value, 'zhen.nann');

      // has
      res = this.ctx.cache.mem.has(name);
      assert.equal(!!res, true);

      // get
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, 'zhennann');

      // remove
      this.ctx.cache.mem.remove(name);
      res = this.ctx.cache.mem.has(name);
      assert.equal(res, null);

      // set with timeout
      this.ctx.cache.mem.set(name, 'zhennann', 1000);

      // get
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, 'zhennann');

      // other module's cache
      const moduleCache = this.ctx.cache.mem.module(this.ctx.module.info.relativeName);
      value = moduleCache.get(name);
      assert.equal(value, 'zhennann');

      // get after timeout
      await sleep(1500);
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, null);

      // done
      this.ctx.success();
    }
  }
  return MemController;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),

/***/ 1884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class RedisController extends app.Controller {
    async redis() {
      let res;
      let value;

      // name
      const name = '__test:name:redis';

      // getset
      value = await this.ctx.cache.redis.getset(name, 'zhen.nann');
      assert.equal(value, undefined);

      value = await this.ctx.cache.redis.getset(name, 'zhennann');
      assert.equal(value, 'zhen.nann');

      // has
      res = await this.ctx.cache.redis.has(name);
      assert.equal(res, true);

      // get
      value = await this.ctx.cache.redis.get(name);
      assert.equal(value, 'zhennann');

      // remove
      await this.ctx.cache.redis.remove(name);
      res = await this.ctx.cache.redis.has(name);
      assert.equal(res, false);

      // set with timeout
      await this.ctx.cache.redis.set(name, 'zhennann', 2000);

      // get
      value = await this.ctx.cache.redis.get(name);
      assert.equal(value, 'zhennann');

      // other module's cache
      const moduleCache = this.ctx.cache.redis.module(this.ctx.module.info.relativeName);
      value = await moduleCache.get(name);
      assert.equal(value, 'zhennann');

      // get after timeout
      await sleep(3000);
      value = await this.ctx.cache.redis.get(name);
      assert.equal(value, undefined);

      // done
      this.ctx.success();
    }
  }
  return RedisController;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),

/***/ 4463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class ConfigController extends app.Controller {
    async test() {
      // current module
      let message = this.ctx.config.message;
      assert.equal(message, 'Hello World');

      // other module
      message = this.ctx.config.module('test-party').message;
      assert.equal(message, 'Hello World');

      // done
      this.ctx.success();
    }
  }

  return ConfigController;
};


/***/ }),

/***/ 3:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class LocaleController extends app.Controller {
    async enus() {
      const message = this.ctx.config.message;
      const data = {
        enus: this.ctx.text(message),
        zhcn: this.ctx.text.locale('zh-cn', message),
      };

      // done
      this.ctx.success(data);
    }

    async zhcn() {
      const message = this.ctx.config.message;
      const data = {
        zhcn: this.ctx.text(message),
        enus: this.ctx.text.locale('en-us', message),
      };

      // done
      this.ctx.success(data);
    }
  }

  return LocaleController;
};


/***/ }),

/***/ 8954:
/***/ ((module) => {

module.exports = app => {
  class PerformActionController extends app.Controller {
    async performAction() {
      // param: id
      const id = this.ctx.request.body.id;
      // performAction
      const res = await this.ctx.meta.util.performAction({
        method: 'post',
        url: 'test/ctx/performAction/echo',
        body: {
          id,
        },
      });
      this.ctx.success(res);
    }

    async echo() {
      // body: id
      const id = this.ctx.request.body.id;
      // echo back
      this.ctx.success(id);
    }
  }

  return PerformActionController;
};


/***/ }),

/***/ 9456:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class RequestController extends app.Controller {
    async request() {
      // param
      assert.equal(this.ctx.params.id, '1');
      assert.equal(this.ctx.getInt('id'), 1);

      // query
      assert.equal(this.ctx.query.age, '18');
      assert.equal(this.ctx.getInt('age'), 18);

      // body
      assert.equal(this.ctx.request.body.userName, 'zhennann');
      assert.equal(this.ctx.getStr('userName'), 'zhennann');

      // done
      this.ctx.success();
    }

    async requestXML() {
      // payload
      const payload = await this.ctx.getPayload();
      // return
      this.ctx.status = 200;
      this.ctx.type = 'text/xml';
      this.ctx.body = payload.toString();
    }
  }

  return RequestController;
};


/***/ }),

/***/ 4902:
/***/ ((module) => {

module.exports = app => {
  class ResponseController extends app.Controller {
    async success() {
      const res = {
        userName: 'zhennann',
      };
      this.ctx.success(res);
    }

    async successMore() {
      const page = this.ctx.request.body.page;
      const items = [{ userName: 'zhennann' }, { userName: 'root' }];
      this.ctx.successMore(items, page.index, page.size);
    }

    async fail() {
      // Error Test
      this.ctx.fail(1001);
    }

    async throwError() {
      this.ctx.throw(1001);
    }
  }

  return ResponseController;
};


/***/ }),

/***/ 4316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class SessionController extends app.Controller {
    async session() {
      // key1
      this.ctx.session._key1 = 1;
      // echo1
      const res = await this.ctx.meta.util.performAction({
        method: 'post',
        url: 'test/ctx/session/echo1',
      });
      assert.equal(res.user.op.id, this.ctx.state.user.op.id);
      assert.equal(res.instance.id, this.ctx.instance.id);
      assert.equal(this.ctx.session._key2, 2);
      // done
      this.ctx.success();
    }

    async echo1() {
      // echo2
      const res = await this.ctx.meta.util.performAction({
        method: 'post',
        url: 'test/ctx/session/echo2',
      });
      // echo back
      this.ctx.success(res);
    }

    async echo2() {
      // check
      assert.equal(this.ctx.session._key1, 1);
      // key2
      this.ctx.session._key2 = 2;
      // echo back
      this.ctx.success({
        user: this.ctx.state.user,
        instance: this.ctx.instance,
      });
    }
  }

  return SessionController;
};


/***/ }),

/***/ 5918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class TailController extends app.Controller {
    async tail() {
      // 1
      this.ctx.meta._tail_test = 1;

      // tail
      this.ctx.tail(() => {
        assert.equal(this.ctx.meta._tail_test, 2);
        this.ctx.tail(() => {
          assert.equal(this.ctx.meta._tail_test, 3);
        });
        this.ctx.meta._tail_test = 3;
      });

      // 2
      this.ctx.meta._tail_test = 2;

      // done
      this.ctx.success();
    }
  }

  return TailController;
};


/***/ }),

/***/ 4741:
/***/ ((module) => {

module.exports = app => {
  class TransactionController extends app.Controller {
    async transaction() {
      // user
      const user = this.ctx.state.user.op;
      // atomKey
      const atomKey = this.ctx.request.body.key;
      // itemNew
      const itemNew = this.ctx.request.body.item;

      // write
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: { atomName: itemNew.atomName },
        user,
      });
      // write: throw error when personCount is 0
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: { personCount: itemNew.personCount },
        user,
      });
      // done
      this.ctx.success();
    }
  }

  return TransactionController;
};


/***/ }),

/***/ 1189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);

  class HelloController extends app.Controller {
    async hello() {
      const data = {
        text: 'hello',
      };
      let result = 'world';
      result = await this.ctx.bean.event.invoke({
        module: moduleInfo.relativeName,
        name: 'hello',
        data,
        result,
        next: async (context, next) => {
          context.result = `${context.result}.hello`;
          await next();
          context.result = `hello.${context.result}`;
        },
      });
      assert.equal(data.text, 'hello echo');
      assert.equal(result, 'echo.hello.world.echo.hello');
      this.ctx.success();
    }
  }

  return HelloController;
};


/***/ }),

/***/ 2267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class BeanController extends app.Controller {
    async bean() {
      const a = 3;
      const b = 4;
      let res;

      // app.bean
      assert.equal(app.bean['test-party.test.app'], app.bean['test-party.test.app']);

      res = app.bean['test-party.test.app'].actionSync({ a, b });
      assert.equal(res, `${a + b}:regexpaop`);

      res = await app.bean['test-party.test.app'].actionAsync({ a, b });
      assert.equal(res, `${a + b}:regexpaop`);

      // ctx.bean: global
      assert.equal(this.ctx.bean.testctx, this.ctx.bean.testctx);

      // magic
      res = this.ctx.bean.testctx.magic;
      assert.equal(res, 'magic:simpleaop');

      // name
      this.ctx.bean.testctx.name = 'test-party:regexpaop:simpleaop';
      res = this.ctx.bean.testctx.name;
      assert.equal(res, 'test-party:regexpaop:simpleaop');

      res = this.ctx.bean.testctx.actionSync({ a, b });
      assert.equal(res, `${a + b}:regexpaop:simpleaop`);

      res = await this.ctx.bean.testctx.actionAsync({ a, b });
      assert.equal(res, `${a + b}:regexpaop:simpleaop`);

      res = await this.ctx.bean.testctx.actionAsync2({ a, b });
      assert.equal(res, `test-party:regexpaop:simpleaop:${a + b}:regexpaop:simpleaop`);

      res = await this.ctx.bean.testctx.actionAsync3({ a, b });
      assert.equal(res, `test-party:regexpaop:simpleaop:${a + b}:regexpaop:simpleaop`);

      // ctx.bean: class
      assert.equal(this.ctx.bean['test-party.test.class'], this.ctx.bean['test-party.test.class']);

      res = this.ctx.bean['test-party.test.class'].actionSync({ a, b });
      assert.equal(res, `${a + b}:regexpaop`);

      res = await this.ctx.bean['test-party.test.class'].actionAsync({ a, b });
      assert.equal(res, `${a + b}:regexpaop`);

      // ok
      this.ctx.success();
    }

    async local() {
      let res;

      // general way
      res = this.ctx.bean._getBean(moduleInfo.relativeName, 'local.test').name;
      assert.equal(res, 'localTest');

      // this module
      res = this.ctx.bean.local.test.name;
      assert.equal(res, 'localTest');

      // other module
      res = this.ctx.bean.local.module(moduleInfo.relativeName).test.name;
      assert.equal(res, 'localTest');

      // ok
      this.ctx.success();
    }
  }

  return BeanController;
};


/***/ }),

/***/ 8589:
/***/ ((module) => {

module.exports = app => {
  class BroadcastController extends app.Controller {
    async emit() {
      this.ctx.meta.util.broadcastEmit({
        locale: 'zh-cn',
        module: 'test-party',
        broadcastName: 'broadcastTest',
        data: { message: 'hello' },
      });
      this.ctx.success();
    }
  }

  return BroadcastController;
};


/***/ }),

/***/ 8358:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class CategoryController extends app.Controller {
    async category() {
      // atomClass
      const atomClass = {
        module: 'test-party',
        atomClassName: 'party',
      };

      // add
      const categoryId = await this.ctx.bean.category.add({
        atomClass,
        data: {
          language: 'en-us',
          categoryName: 'levelOne',
          categoryIdParent: 0,
        },
      });
      assert(categoryId > 0);

      // parseCategoryName: levelOne.levelTwo.levelThree
      const category = await this.ctx.bean.category.parseCategoryName({
        atomClass,
        language: 'en-us',
        categoryName: 'levelOne.levelTwo.levelThree',
        force: true,
      });
      assert.equal(category.categoryName, 'levelThree');

      // ok
      this.ctx.success();
    }
  }

  return CategoryController;
};


/***/ }),

/***/ 1137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

const __testData_allowAllFieldsRead = {
  mode: 'allowAllFieldsRead',
};
const __testData_allowAllFieldsReadWrite = {
  mode: 'allowAllFieldsReadWrite',
};
const __testData_allowSpecificFields_1 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: true },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: false }],
};
const __testData_allowSpecificFields_2 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: false },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: true }, 'details'],
};
const __testData_allowSpecificFields_3 = {
  mode: 'allowSpecificFields',
  basic: { read: false, write: false },
  fields: [
    'atomName',
    { name: 'detailsAmount', read: true, write: true },
    { name: 'details', read: true, write: false },
  ],
};
const __testData_custom_array = {
  mode: 'custom',
  custom: [
    // 'atomName',
    {
      name: 'detailsAmount',
      property: {
        type: 'number',
        ebType: 'detailsStat',
        ebTitle: 'Amount',
        ebParams: {
          detailClass: {
            module: 'test-flow',
            atomClassName: 'purchaseOrderDetail',
          },
          summary: {
            type: 'sum',
            field: 'amount',
          },
          currency: true,
        },
        ebAutoSubmit: true,
      },
    },
    'details',
  ],
};
const __testData_custom_object = {
  mode: 'custom',
  custom: {
    module: 'test-flow',
    validator: 'purchaseOrder',
  },
};

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class FieldsController extends app.Controller {
    async parseSchema() {
      const moduleTestFlow = app.meta.modules['test-flow'];
      if (!moduleTestFlow) {
        // do nothing
        this.ctx.success();
        return;
      }
      // atomClass
      const atomClass = { module: 'test-flow', atomClassName: 'purchaseOrder' };
      // mode: allowAllFieldsRead
      await this._parseSchema_mode_allowAllFieldsRead({ atomClass });
      // mode: allowAllFieldsReadWrite
      await this._parseSchema_mode_allowAllFieldsReadWrite({ atomClass });
      // mode: allowSpecificFields_1
      await this._parseSchema_mode_allowSpecificFields_1({ atomClass });
      // mode: allowSpecificFields_2
      await this._parseSchema_mode_allowSpecificFields_2({ atomClass });
      // mode: allowSpecificFields_3
      await this._parseSchema_mode_allowSpecificFields_3({ atomClass });
      // mode: custom_array
      await this._parseSchema_mode_custom_array({ atomClass });
      // mode: custom_object
      await this._parseSchema_mode_custom_object({ atomClass });
      // ok
      this.ctx.success();
    }

    // mode: allowAllFieldsRead
    async _parseSchema_mode_allowAllFieldsRead({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowAllFieldsRead,
      });
      assert.equal(schemaBase.schema.properties.atomName.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, true);
    }

    // mode: allowAllFieldsReadWrite
    async _parseSchema_mode_allowAllFieldsReadWrite({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowAllFieldsReadWrite,
      });
      assert.equal(schemaBase.schema.properties.atomName.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
      assert.equal(schemaBase.isSchemaBase, true);
    }

    // mode: allowSpecificFields_1
    async _parseSchema_mode_allowSpecificFields_1({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_1,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
    }

    // mode: allowSpecificFields_2
    async _parseSchema_mode_allowSpecificFields_2({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_2,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, false);
      assert.equal(schemaBase.schema.properties.details, undefined);
    }

    // mode: allowSpecificFields_3
    async _parseSchema_mode_allowSpecificFields_3({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_3,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, false);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, true);
    }
    // mode: custom_array
    async _parseSchema_mode_custom_array({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_custom_array,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
    }
    // mode: custom_array
    async _parseSchema_mode_custom_object({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_custom_object,
      });
      assert.equal(schemaBase.schema.properties.atomName.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
    }
  }
  return FieldsController;
};


/***/ }),

/***/ 6766:
/***/ ((module) => {

module.exports = app => {
  class HttpLogController extends app.Controller {
    async httpLog() {
      // please see: {projectDir}/src/backend/logs/{projectName}/{projectName}-web.log
      this.ctx.success('this is a test for httpLog');
    }
  }

  return HttpLogController;
};


/***/ }),

/***/ 8316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class InstanceController extends app.Controller {
    async instance() {
      assert.equal(!!this.ctx.instance.id, true);
      assert.equal(!!this.ctx.instance.config, true);
      this.ctx.success();
    }
  }
  return InstanceController;
};


/***/ }),

/***/ 3777:
/***/ ((module) => {

module.exports = app => {
  class TestController extends app.Controller {
    async interception() {
      const { a, b } = this.ctx.request.body;
      const c = parseInt(a) + parseInt(b);
      this.ctx.success(c);
    }

    async restructuring() {
      const { a, b } = this.ctx.request.body;
      const c = a + b;
      this.ctx.success(c);
    }
  }

  return TestController;
};


/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  const atomStaticKey = '--model--test--';
  const __rows = [
    { atomStaticKey, atomName: 'atom-one', atomStage: 0 },
    { atomStaticKey, atomName: 'atom-two', atomStage: 1 },
    { atomStaticKey, atomName: 'atom-three', atomStage: 2 },
  ];

  class ModelController extends app.Controller {
    async model() {
      // model
      const model = this.ctx.model.module('a-base').atom;

      // insert one row
      await model.insert(__rows[0]);
      // insert multi rows
      await model.insert(__rows.slice(1));

      // select
      let list = await model.select({
        where: { atomStaticKey },
      });
      assert.equal(list.length, 3);

      // read
      const item = await model.get({
        atomStaticKey,
        atomName: 'atom-one',
      });

      // update one row
      await model.update({
        id: item.id,
        readCount: item.readCount + 1,
      });

      // update with options.where and options.columns
      await model.update(
        {
          readCount: 1,
        },
        {
          where: { atomStaticKey },
          columns: ['readCount'],
        }
      );

      // select: in
      list = await model.select({
        where: { atomStaticKey: [atomStaticKey] },
      });
      assert.equal(list.length, 3);
      list = await model.select({
        where: {
          atomStaticKey: {
            op: 'in',
            val: [atomStaticKey],
          },
        },
      });
      assert.equal(list.length, 3);

      // select: is null
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          atomName: null,
        },
      });
      assert.equal(list.length, 0);

      // select: is not null
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          atomName: {
            op: 'notNull',
          },
        },
      });
      assert.equal(list.length, 3);

      // select: like
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          atomName: {
            op: 'likeRight',
            val: 'atom-',
          },
        },
      });
      assert.equal(list.length, 3);

      // select: or
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [{ atomName: 'atom-one' }, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 2);

      // delete
      await model.delete({ atomStaticKey });

      // count
      const count = await model.count({ atomStaticKey });
      assert.equal(count, 0);

      // done
      this.ctx.success();
    }
  }

  return ModelController;
};


/***/ }),

/***/ 5438:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  const atomStaticKey = '--modelWhere--test--';
  const __rows = [
    { atomStaticKey, atomName: 'atom-one', atomStage: 0 },
    { atomStaticKey, atomName: 'atom-two', atomStage: 1 },
    { atomStaticKey, atomName: 'atom-three', atomStage: 2 },
  ];

  class ModelController extends app.Controller {
    async modelWhere() {
      await this._modelWhere();
      this.ctx.success();
    }

    async _modelWhere() {
      // model
      const model = this.ctx.model.module('a-base').atom;

      // delete: force clear old data
      await model.delete({ atomStaticKey });

      // insert one row
      await model.insert(__rows[0]);
      // insert multi rows
      await model.insert(__rows.slice(1));

      // select: or false/false
      let list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [false, false],
        },
      });
      assert.equal(list.length, 0);
      // select: or false/clause
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [false, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 1);
      // select: or true/clause
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __or__: [true, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 3);

      // select: and true/true
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __and__: [true, true],
        },
      });
      assert.equal(list.length, 3);
      // select: and true/clause
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __and__: [true, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 1);
      // select: and false/clause
      list = await model.select({
        where: {
          atomStaticKey: [atomStaticKey],
          __and__: [false, { atomName: 'atom-two' }],
        },
      });
      assert.equal(list.length, 0);

      // delete
      await model.delete({ atomStaticKey });

      // count
      const count = await model.count({ atomStaticKey });
      assert.equal(count, 0);
    }
  }

  return ModelController;
};


/***/ }),

/***/ 746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class TestController extends app.Controller {
    async resourceCheckSuccess() {
      const user = this.ctx.state.user.op;
      assert.equal(user.userName, 'root');
      this.ctx.success();
    }

    async resourceCheckFail() {
      const user = this.ctx.state.user.op;
      assert.equal(user.userName, 'root');
      this.ctx.success();
    }
  }

  return TestController;
};


/***/ }),

/***/ 816:
/***/ ((module) => {

module.exports = app => {
  class ProgressController extends app.Controller {
    async progress() {
      // create progress
      const progressId = await this.ctx.bean.progress.create();
      // background
      this.ctx.runInBackground(async () => {
        await this._progressInBackground({ progressId });
      });
      // return progressId
      this.ctx.success({ progressId });
    }

    async _progressInBackground({ progressId }) {
      try {
        // level one
        await this._levelOne({ progressId, progressNo: 0 });
        // progress done
        await this.ctx.bean.progress.done({ progressId, message: this.ctx.text('Well Done') });
        // ok
        this.ctx.success(true);
      } catch (err) {
        // progress error
        await this.ctx.bean.progress.error({ progressId, message: err.message });
        // throw err
        throw err;
      }
    }

    async _levelOne({ progressId, progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level One')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
        // level two
        await this._levelTwo({ progressId, progressNo: progressNo + 1 });
      }
    }

    async _levelTwo({ progressId, progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level Two')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
        // level two
        await this._levelThree({ progressId, progressNo: progressNo + 1 });
      }
    }

    async _levelThree({ progressId, progressNo }) {
      const total = 3;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level Three')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
      }
    }
  }
  return ProgressController;
};


/***/ }),

/***/ 4828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class QueueController extends app.Controller {
    async pushAsync() {
      const res = await this.ctx.meta.util.queuePushAsync({
        module: 'test-party',
        queueName: 'queueTest',
        data: { a: 1, b: 2 },
      });
      assert.equal(res, 3);
      this.ctx.success();
    }

    async push() {
      this.ctx.meta.util.queuePush({
        module: 'test-party',
        queueName: 'queueTest',
        data: { a: 1, b: 2 },
      });
      this.ctx.success();
    }
  }

  return QueueController;
};


/***/ }),

/***/ 7375:
/***/ ((module) => {

module.exports = app => {
  class SendMailController extends app.Controller {
    async sendMail() {
      // send
      const message = this.ctx.request.body.data;
      await this.ctx.bean.mail.send({
        scene: 'test',
        message,
      });
      // done
      this.ctx.success();
    }
  }

  return SendMailController;
};


/***/ }),

/***/ 9557:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');
const pMap = require3('p-map');

module.exports = app => {
  class SequenceController extends app.Controller {
    async sequence() {
      const arr = [1, 2, 3, 4, 5];
      let results;

      // current
      let current = await this.ctx.bean.sequence.current('test');
      assert.equal(current, 0);

      // next
      let next = await this.ctx.bean.sequence.next('test');
      assert.equal(next, 1);

      // current
      current = await this.ctx.bean.sequence.current('test');
      assert.equal(current, 1);

      // reset
      await this.ctx.bean.sequence.reset('test');

      // other module's sequence
      const moduleSequence = this.ctx.bean.sequence.module(this.ctx.module.info.relativeName);

      // next
      next = await moduleSequence.next('test');
      assert.equal(next, 1);

      // current
      current = await moduleSequence.current('test');
      assert.equal(current, 1);

      // reset
      await moduleSequence.reset('test');

      // concurrency
      results = await pMap(arr, async () => {
        return await moduleSequence.next('test');
      });
      assert.equal(new Set(results).size, new Set(arr).size);

      // reset
      await moduleSequence.reset('test');

      // concurrency transaction
      results = await pMap(arr, async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: this.ctx.module.info.relativeName,
          transaction: true,
          fn: async ({ ctx }) => {
            const res = await ctx.bean.sequence.next('test');
            await ctx.bean.util.sleep(50);
            return res;
          },
        });
      });
      assert.equal(new Set(results).size, new Set(arr).size, `sequence next: ${results}`);

      // reset
      await moduleSequence.reset('test');

      // done
      this.ctx.success();
    }
  }
  return SequenceController;
};


/***/ }),

/***/ 9076:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class SettingsController extends app.Controller {
    async settings() {
      // user

      // get settings from config
      let data = await this.ctx.bean.settings.getUser({ name: '/groupInfo/username' });
      assert.equal(data, 'zhennann');
      data = await this.ctx.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
      assert.equal(data, 'en-us');

      // load settings
      data = await this.ctx.bean.settings.loadSettingsUser();
      assert.equal(data.groupInfo.username, 'zhennann');
      // save settings
      data.groupExtra.panelExtra.groupInfo.language = 'zh-cn';
      await this.ctx.bean.settings.saveSettingsUser({ data });

      // get settings from db
      data = await this.ctx.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
      assert.equal(data, 'zh-cn');

      // instance

      // get settings from config
      data = await this.ctx.bean.settings.getInstance({ name: '/groupInfo/slogan' });
      assert.equal(data, '');

      // load settings
      data = await this.ctx.bean.settings.loadSettingsInstance();
      assert.equal(data.groupInfo.slogan, '');
      // save settings
      data.groupInfo.slogan = 'Less is more, while more is less';
      await this.ctx.bean.settings.saveSettingsInstance({ data });

      // get settings from db
      data = await this.ctx.bean.settings.getInstance({ name: '/groupInfo/slogan' });
      assert.equal(data, 'Less is more, while more is less');

      // ok
      this.ctx.success();
    }
  }
  return SettingsController;
};


/***/ }),

/***/ 5563:
/***/ ((module) => {

const _subscribePathTest = '/test/party/test';
const _subscribePathSimpleChat = '/test/party/simpleChat';

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SocketIOController extends app.Controller {
    async publish() {
      const options = this.ctx.request.body.options;
      const message = this.ctx.request.body.message;
      message.userIdFrom = this.ctx.state.user.op.id;
      const res = await this.ctx.bean.io.publish({
        path: _subscribePathTest,
        message,
        messageClass: {
          module: moduleInfo.relativeName,
          messageClassName: 'test',
        },
        options,
      });
      // done
      this.ctx.success(res);
    }

    async simpleChat() {
      const options = this.ctx.request.body.options;
      const message = this.ctx.request.body.message;
      message.userIdFrom = this.ctx.state.user.op.id;
      message.userIdsTo = await this._collectUserIds();
      // message.userIdTo = -1;
      const res = await this.ctx.bean.io.publish({
        path: _subscribePathSimpleChat,
        message,
        messageClass: {
          module: moduleInfo.relativeName,
          messageClassName: 'simpleChat',
        },
        options,
      });
      // done
      this.ctx.success(res);
    }

    async _collectUserIds() {
      const ioRedis = this.ctx.bean.local.module('a-socketio').redis;
      const userIds = await ioRedis._getPathUsersOnline({ path: _subscribePathSimpleChat });
      const userAdmin = await this.ctx.bean.user.get({ userName: 'admin' });
      if (userAdmin && !userIds.includes(userAdmin.id)) {
        userIds.push(userAdmin.id);
      }
      return userIds;
    }
  }

  return SocketIOController;
};


/***/ }),

/***/ 7687:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class StatsController extends app.Controller {
    async stats() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const user = { id: userIds.Tom };

      // old
      let value = await this.ctx.bean.stats.get({
        name: 'tasksUser',
        nameSub: 'department.project',
        user,
      });
      assert.equal(value, undefined);

      // notify
      await this.ctx.bean.stats.notifyAsync({
        name: 'tasksUser',
        nameSub: 'department.project',
        user,
      });

      // new
      value = await this.ctx.bean.stats.get({
        name: 'tasksUser',
        nameSub: 'department.project',
        user,
      });
      assert.equal(value, 1);

      // instance
      value = await this.ctx.bean.stats.get({
        name: 'tasksInstance',
        user,
      });
      assert.equal(value, 1);

      // done
      this.ctx.success();
    }

    async plus() {
      this.ctx.bean.stats.notify({
        name: 'tasksUser',
        nameSub: 'department.project',
      });
      this.ctx.success();
    }
  }
  return StatsController;
};


/***/ }),

/***/ 8142:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class StatusController extends app.Controller {
    async status() {
      // name
      const name = '__test_enable';

      // get
      let value = await this.ctx.bean.status.get(name);
      assert.equal(value, undefined);

      // set
      await this.ctx.bean.status.set(name, true);

      // get
      value = await this.ctx.bean.status.get(name);
      assert.equal(value, true);

      // other module's status
      const moduleStatus = this.ctx.bean.status.module(this.ctx.module.info.relativeName);
      value = await moduleStatus.get(name);
      assert.equal(value, true);

      // set
      await this.ctx.bean.status.set(name, false);

      // get
      value = await this.ctx.bean.status.get(name);
      assert.equal(value, false);

      // done
      this.ctx.success();
    }
  }
  return StatusController;
};


/***/ }),

/***/ 4419:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class SummerController extends app.Controller {
    async summer() {
      // name
      const name = 'test';
      const key1 = { id: 1 };
      const key2 = { id: 2 };
      const key3 = { id: 3 };

      // getCache
      const cache = this.ctx.bean.summer.getCache({ name });
      assert.equal(!!cache, true);
      let cacheOtherModule = this.ctx.bean.summer.module(moduleInfo.relativeName).getCache({ name });
      assert.equal(!!cacheOtherModule, true);
      cacheOtherModule = this.ctx.bean.summer.getCache({ module: moduleInfo.relativeName, name });
      assert.equal(!!cacheOtherModule, true);

      let value;
      let values;

      // get: peek
      value = await cache.peek(key1);
      assert.equal(value, undefined);

      // get
      value = await cache.get(key1);
      assert.equal(value.id, key1.id);

      // get: peek
      value = await cache.peek(key1);
      assert.equal(value.id, key1.id);
      value = await cache.peek(key1, { mode: 'mem' });
      assert.equal(value.id, key1.id);
      value = await cache.peek(key1, { mode: 'redis' });
      assert.equal(value.id, key1.id);

      // get: peek sleep for mem stale
      await this.ctx.bean.util.sleep(1000);

      // get: peek again
      value = await cache.peek(key1, { mode: 'mem' });
      assert.equal(value, undefined);
      value = await cache.peek(key1, { mode: 'redis' });
      assert.equal(value.id, key1.id);

      // get: peek sleep for redis stale
      await this.ctx.bean.util.sleep(2000);

      // get: peek again
      value = await cache.peek(key1, { mode: 'mem' });
      assert.equal(value, undefined);
      value = await cache.peek(key1, { mode: 'redis' });
      assert.equal(value, undefined);

      // mget
      //   mem cache graph: key1
      value = await cache.get(key1);
      assert.equal(value.id, key1.id);
      //   mem cache graph: key2 key3
      values = await cache.mget([key1, key2, key3]);
      assert.equal(values[0].id, key1.id);
      assert.equal(values[1].id, key2.id);
      assert.equal(values[2].id, key3.id);
      //   mem cache graph: key3 key1
      values = await cache.mget([key1, key2, key3]);
      assert.equal(values[0].id, key1.id);
      assert.equal(values[1].id, key2.id);
      assert.equal(values[2].id, key3.id);

      // mget: peek
      value = await cache.peek(key2, { mode: 'mem' });
      assert.equal(value, undefined);
      value = await cache.peek(key2, { mode: 'redis' });
      assert.equal(value.id, key2.id);

      // del
      await cache.del(key1);
      await cache.del(key2);

      // mdel
      await cache.mdel([key1, key2, key3]);

      // mdel: peek
      value = await cache.peek(key3, { mode: 'mem' });
      assert.equal(value, undefined);
      value = await cache.peek(key3, { mode: 'redis' });
      assert.equal(value, undefined);

      // clear
      values = await cache.mget([key1, key2, key3]);
      assert.equal(values[2].id, key3.id);
      value = await cache.peek(key3, { mode: 'mem' });
      assert.equal(value.id, key3.id);
      value = await cache.peek(key3, { mode: 'redis' });
      assert.equal(value.id, key3.id);

      await cache.clear();

      value = await cache.peek(key3, { mode: 'mem' });
      assert.equal(value, undefined);
      value = await cache.peek(key3, { mode: 'redis' });
      assert.equal(value, undefined);

      // done
      this.ctx.success();
    }
  }
  return SummerController;
};


/***/ }),

/***/ 9240:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class TagController extends app.Controller {
    async tag() {
      // atomClass
      const atomClass = {
        module: 'test-party',
        atomClassName: 'party',
      };

      // add
      const tagId = await this.ctx.bean.tag.add({
        atomClass,
        data: {
          // language: 'en-us', // neednot set language
          tagName: 'tagOne',
        },
      });
      assert(tagId > 0);

      // parseTags: 'tagOne,tagTwo,tagThree'
      const tagIds = await this.ctx.bean.tag.parseTags({
        atomClass,
        // language: 'en-us',// neednot set language
        tagName: 'tagOne,tagTwo,tagThree',
        force: true,
      });
      assert.equal(tagIds.length, 3);

      // ok
      this.ctx.success();
    }
  }

  return TagController;
};


/***/ }),

/***/ 2433:
/***/ ((module) => {

module.exports = app => {
  class ValidationController extends app.Controller {
    async success() {
      this.ctx.success();
    }

    async fail() {
      this.ctx.success();
    }

    async schema() {
      this.ctx.success();
    }
  }

  return ValidationController;
};


/***/ }),

/***/ 3330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class AllController extends app.Controller {
    async all() {
      const totalTimes = 1;
      const timeStart = new Date().getTime() / 1000;
      for (let i = 0; i < totalTimes; i++) {
        await this.__all();
        console.log(`-----all time: ${i}`);
      }
      const timeEnd = new Date().getTime() / 1000;
      console.log(`-----all time used: ${timeEnd - timeStart}s`);
      // done
      this.ctx.success();
    }
    async __all() {
      // atomClass
      const atomClass = await this.ctx.bean.atomClass.get({
        module: 'a-useronline',
        atomClassName: 'userOnlineHistory',
      });
      this.atomClass = atomClass;
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userTom = await this._getUser({ userIds, userName: 'Tom' });
      // const userRoot = await this._getUser({userIds, userName:'root'});

      // delete: force clear old data
      const modelHistory = this.ctx.model.module('a-useronline').userOnlineHistory;
      await modelHistory.delete({ isLogin: 2 });

      // user->atom
      await this._testCheckList(
        userIds,
        [
          ['Tom', 0],
          ['root', 0],
          ['', 0],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );

      // add useronline
      const itemKey = await this.ctx.bean.atom.create({
        atomClass,
      });
      await this.ctx.bean.atom.write({
        key: itemKey,
        atomClass,
        item: {
          userId: userTom.id,
          isLogin: 2,
        },
        options: {
          ignoreValidate: true,
        },
      });

      await this._testCheckList(
        userIds,
        [
          ['Tom', 0],
          ['root', 1],
          ['', 1],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );

      // get useronline
      const userOnline = await this.ctx.bean.atom.read({ key: itemKey, atomClass });
      assert.equal(userOnline.userId, userTom.id);

      // checkRightRead
      const checkRightReads = [
        ['Tom', itemKey.atomId, false],
        ['root', itemKey.atomId, true],
      ];
      for (const [userName, atomId, right] of checkRightReads) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightRead({
          atom: { id: atomId },
          atomClass,
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightWrite
      const checkRightWrites = [
        ['Tom', itemKey.atomId, false],
        ['root', itemKey.atomId, false],
      ];
      for (const [userName, atomId, right] of checkRightWrites) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightAction({
          atom: { id: atomId },
          atomClass,
          action: 'write',
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightDelete
      const checkRightDeletes = [
        ['Tom', itemKey.atomId, false],
        ['root', itemKey.atomId, true],
      ];
      for (const [userName, atomId, right] of checkRightDeletes) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightAction({
          atom: { id: atomId },
          atomClass,
          action: 'delete',
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // checkRightCreate
      const checkRightCreates = [
        ['Tom', false],
        ['root', false],
      ];
      for (const [userName, right] of checkRightCreates) {
        const user = await this._getUser({ userIds, userName });
        const res = await this.ctx.bean.atom.checkRightCreate({
          atomClass,
          user,
        });
        assert.equal(!!res, right, userName);
      }

      // delete useronline
      await this.ctx.bean.atom.delete({
        key: itemKey,
        atomClass,
      });

      await this._testCheckList(
        userIds,
        [
          ['Tom', 0],
          ['root', 0],
          ['', 0],
        ],
        (actual, expected, userName) => {
          assert.equal(actual, expected, userName);
        }
      );
    }

    async _testCheckList(userIds, userAtoms, cb) {
      for (const [userName, atomCountExpected] of userAtoms) {
        const user = await this._getUser({ userIds, userName });
        const list = await this.ctx.bean.atom.select({
          atomClass: this.atomClass,
          options: {
            where: {
              isLogin: 2,
            },
            orders: null,
            page: null,
          },
          user,
        });
        // callback
        cb(list.length, atomCountExpected, userName);
      }
    }

    async _getUser({ userIds, userName }) {
      if (!userName) return null;
      const userId = userIds && userIds[userName];
      if (userId) return { id: userId };
      return await this.ctx.bean.user.get({ userName });
    }
  }

  return AllController;
};


/***/ }),

/***/ 8541:
/***/ ((module) => {

module.exports = app => {
  class RightController extends app.Controller {
    async checkRightCreate() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.atomClass);
    }

    async checkRightRead() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async createRaw() {
      const itemKey = await this.ctx.bean.atom.create({
        atomClass: this.ctx.request.body.atomClass,
      });
      this.ctx.success(itemKey);
    }

    async checkRightWrite() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }

    async checkRightAction() {
      // checked by route/middleware
      this.ctx.success(this.ctx.request.body.key);
    }
  }

  return RightController;
};


/***/ }),

/***/ 5594:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class MonkeyeeController extends app.Controller {
    async test() {
      this.ctx.success(moduleInfo.relativeName);
    }
  }

  return MonkeyeeController;
};


/***/ }),

/***/ 5196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class RoleController extends app.Controller {
    async role() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      // // roleIds
      // const roleIds = this.ctx.cache.mem.get('roleIds');

      const dataTests = [
        {
          userName: 'root',
          childrenTop: {
            count: 1,
            roleNames: 'root',
          },
          children: {
            count: 2,
            roleNames: 'anonymous,authenticated',
          },
        },
        {
          userName: 'Tomson',
          childrenTop: {
            count: 0,
            roleNames: '',
          },
          children: {
            count: 2,
            roleNames: 'anonymous,authenticated',
          },
        },
        {
          userName: 'Tom',
          childrenTop: {
            count: 1,
            roleNames: 'organization',
          },
          children: {
            count: 2,
            roleNames: 'internal,external',
          },
        },
      ];
      const roleTypes = [0, 1, 2, 3, 4];
      for (const dataTest of dataTests) {
        // childrenTop
        const userName = dataTest.userName;
        const userId = userIds[userName];
        let list = await this.ctx.bean.role.childrenTop({
          roleTypes,
          page: null,
          user: { id: userId },
        });
        assert.equal(list.length, dataTest.childrenTop.count, userName);
        assert.equal(list.map(item => item.roleName).join(','), dataTest.childrenTop.roleNames, userName);

        if (list.length > 0) {
          const roleOne = list[0];
          list = await this.ctx.bean.role.children({ roleTypes, roleId: roleOne.id, page: null, user: { id: userId } });
          assert.equal(list.length, dataTest.children.count, userName);
          assert.equal(list.map(item => item.roleName).join(','), dataTest.children.roleNames, userName);
        }
      }

      // done
      this.ctx.success();
    }
  }

  return RoleController;
};


/***/ }),

/***/ 8351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class UserController extends app.Controller {
    async user() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      // roleIds
      const roleIds = this.ctx.cache.mem.get('roleIds');

      const dataTests = [
        {
          userName: 'root',
          selectTop: {
            countMin: 9,
            userNameContain: 'Jannie',
          },
          selectRole: {
            countMin: 4,
            userNameContain: 'Jannie',
          },
        },
        {
          userName: 'Tomson',
          selectTop: {
            countMin: 0,
            userNameContain: '',
          },
          selectRole: {
            countMin: 0,
            userNameContain: '',
          },
        },
        {
          userName: 'Tom',
          selectTop: {
            countMin: 8,
            userNameContain: 'Jannie',
          },
          selectRole: {
            countMin: 4,
            userNameContain: 'Jannie',
          },
        },
      ];

      for (const dataTest of dataTests) {
        // childrenTop
        const userName = dataTest.userName;
        const userId = userIds[userName];
        let list = await this.ctx.bean.user.select({ options: {}, user: { id: userId } });
        assert.equal(list.length >= dataTest.selectTop.countMin, true, userName);
        if (dataTest.selectTop.userNameContain) {
          const userNames = list.map(item => item.userName);
          assert.equal(userNames.includes(dataTest.selectTop.userNameContain), true, userName);
        }

        const roleId = roleIds.family;
        list = await this.ctx.bean.user.select({
          options: {
            role: roleId,
          },
          user: { id: userId },
        });
        assert.equal(list.length >= dataTest.selectRole.countMin, true, userName);
        if (dataTest.selectRole.userNameContain) {
          const userNames = list.map(item => item.userName);
          assert.equal(userNames.includes(dataTest.selectRole.userNameContain), true, userName);
        }
      }

      // done
      this.ctx.success();
    }
  }

  return UserController;
};


/***/ }),

/***/ 180:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class AllController extends app.Controller {
    async all() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userRoot = { id: userIds.root };

      // function all: including widgets
      let resourceStaticsAll = this.ctx.module.main.meta.base.statics['a-base.resource'].items;
      resourceStaticsAll = resourceStaticsAll.filter(item => item.atomRevision > -1);
      const resourceCount = resourceStaticsAll.length;

      // Tom list all
      let list = await this.ctx.bean.resource.select({
        options: {
          where: {
            'a.atomStaticKey': {
              op: 'likeRight',
              val: 'test-party:',
            },
          },
          orders: [['a.id', 'asc']],
          page: { index: 0, size: 0 },
          locale: 'en-us',
        },
        user: userRoot,
      });
      assert.equal(list.length, resourceCount);
      assert.equal(!!list[0].atomNameLocale, true);

      // hold first
      const resource_one = list[0];

      // checkRightResource
      const res = await this.ctx.bean.resource.checkRightResource({
        atomStaticKey: resource_one.atomStaticKey,
        user: userRoot,
      });
      assert.equal(!!res, true);

      // check
      list = await this.ctx.bean.resource.check({
        atomStaticKeys: [resource_one.atomStaticKey],
        user: userRoot,
      });
      assert.equal(list[0].passed, true);

      // read
      const item = await this.ctx.bean.resource.read({
        key: { atomId: resource_one.atomId },
        options: { locale: 'en-us' },
        user: userRoot,
      });
      assert.equal(!!item.atomNameLocale, true);

      // done
      this.ctx.success();
    }
  }

  return AllController;
};


/***/ }),

/***/ 4298:
/***/ ((module) => {

module.exports = app => {
  class RightController extends app.Controller {
    async checkRightResourceUser() {
      // checked by route/middleware
      this.ctx.success(this.ctx.meta._resource);
    }
  }

  return RightController;
};


/***/ }),

/***/ 6950:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const require3 = __webpack_require__(3173);
const assert = require3('assert');

module.exports = app => {
  class UserRoleController extends app.Controller {
    async userRole() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      // roleIds
      const roleIds = this.ctx.cache.mem.get('roleIds');

      // direct
      let list = await this.ctx.bean.role.getUserRolesDirect({ userId: userIds.root });
      assert.equal(list.length, 1);
      // parent
      list = await this.ctx.bean.role.getUserRolesParent({ userId: userIds.root });
      assert.equal(list.length, 3);
      // expand
      list = await this.ctx.bean.role.getUserRolesExpand({ userId: userIds.root });
      assert(list.length > 3);

      // direct
      let res = await this.ctx.bean.role.userInRoleDirect({
        userId: userIds.root,
        roleId: roleIds.superuser,
      });
      assert.equal(res, true);
      // parent
      res = await this.ctx.bean.role.userInRoleParent({
        userId: userIds.root,
        roleId: roleIds.root,
      });
      assert.equal(res, true);
      // expand
      res = await this.ctx.bean.role.userInRoleExpand({
        userId: userIds.root,
        roleId: roleIds.system,
      });
      assert.equal(res, true);

      // done
      this.ctx.success();
    }
  }

  return UserRoleController;
};


/***/ }),

/***/ 7095:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const party = __webpack_require__(1653);
const testAtomStarLabel = __webpack_require__(421);
const testAtomAll = __webpack_require__(9503);
const testAtomRight = __webpack_require__(9754);
const testItemOnlyAll = __webpack_require__(3330);
const testItemOnlyRight = __webpack_require__(8541);
const testResourceRight = __webpack_require__(4298);
const testResourceAll = __webpack_require__(180);
const testCtxPerformAction = __webpack_require__(8954);
const testCtxTransaction = __webpack_require__(4741);
const testCtxTail = __webpack_require__(5918);
const testCtxSession = __webpack_require__(4316);
const testCtxRequest = __webpack_require__(9456);
const testCtxResponse = __webpack_require__(4902);
const testCtxConfig = __webpack_require__(4463);
const testCtxLocale = __webpack_require__(3);
const testCacheMem = __webpack_require__(1308);
const testCacheDb = __webpack_require__(6720);
const testCacheRedis = __webpack_require__(1884);
const testRoleUserRole = __webpack_require__(6950);
const testMultilevelAuthorizationRole = __webpack_require__(5196);
const testMultilevelAuthorizationUser = __webpack_require__(8351);
const testEventHello = __webpack_require__(1189);
const testFeatBean = __webpack_require__(2267);
const testFeatFields = __webpack_require__(1137);
const testFeatHttpLog = __webpack_require__(6766);
const testFeatSendMail = __webpack_require__(7375);
const testFeatSocketIO = __webpack_require__(5563);
const testFeatInstance = __webpack_require__(8316);
const testFeatProgress = __webpack_require__(816);
const testFeatSequence = __webpack_require__(9557);
const testFeatSettings = __webpack_require__(9076);
const testFeatStats = __webpack_require__(7687);
const testFeatStatus = __webpack_require__(8142);
const testFeatSummer = __webpack_require__(4419);
const testFeatValidation = __webpack_require__(2433);
const testFeatMiddleware = __webpack_require__(3777);
const testFeatQueue = __webpack_require__(4828);
const testFeatBroadcast = __webpack_require__(8589);
const testFeatModel = __webpack_require__(3058);
const testFeatModelWhere = __webpack_require__(5438);
const testFeatCategory = __webpack_require__(8358);
const testFeatTag = __webpack_require__(9240);
const testOpenAuth = __webpack_require__(746);
const testMonkeyee = __webpack_require__(5594);
const testKitchensinkAutocomplete = __webpack_require__(7361);
const testKitchensinkGuide = __webpack_require__(7350);
const testKitchensinkFormSchemaValidation = __webpack_require__(8664);
const testKitchensinkPtrIsLoadMore = __webpack_require__(7708);

module.exports = app => {
  const controllers = {
    party,
    testAtomStarLabel,
    testAtomAll,
    testAtomRight,
    testItemOnlyAll,
    testItemOnlyRight,
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
    testFeatFields,
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
    testFeatModelWhere,
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


/***/ }),

/***/ 9421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const config = __webpack_require__(7076);
const locales = __webpack_require__(25);
const errors = __webpack_require__(5624);

module.exports = app => {
  // aops
  const aops = __webpack_require__(5224)(app);
  // beans
  const beans = __webpack_require__(5187)(app);
  // routes
  const routes = __webpack_require__(3825)(app);
  // controllers
  const controllers = __webpack_require__(7095)(app);
  // services
  const services = __webpack_require__(7214)(app);
  // models
  const models = __webpack_require__(3230)(app);
  // meta
  const meta = __webpack_require__(458)(app);

  return {
    aops,
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

const require3 = __webpack_require__(3173);
const extend = require3('@zhennann/extend');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const meta = {};
  // schemas
  const schemas = __webpack_require__(8232)(app);
  // keywords
  const keywords = __webpack_require__(2415)(app);
  // socketio
  const socketioTest = __webpack_require__(4160)(app);
  const socketioSimpleChat = __webpack_require__(2513)(app);
  // static
  const staticApps = __webpack_require__(8241)(app);
  const staticDashboards = __webpack_require__(3937)(app);
  const staticLayouts = __webpack_require__(3512)(app);
  const staticResources = __webpack_require__(5429)(app);
  const staticDicts = __webpack_require__(3715)(app);
  const staticRoles = __webpack_require__(5835)(app);
  // cli commands
  const cliCommands = __webpack_require__(4407)(app);
  // icons
  const iconGroups = __webpack_require__(7487);
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
            fields: {
              dicts: {
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
              directShowOnItem: true,
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
        userTest: {
          schemas: 'settingsUser,settingsUserExtra',
        },
        instanceTest: {
          schemas: 'settingsInstance',
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


/***/ }),

/***/ 6893:
/***/ ((module) => {

module.exports = app => {
  class Party extends app.meta.Model {
    constructor(ctx) {
      super(ctx, { table: 'testParty', options: { disableDeleted: false } });
    }
  }

  return Party;
};


/***/ }),

/***/ 3230:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const party = __webpack_require__(6893);

module.exports = app => {
  const models = {};
  Object.assign(models, {
    party,
  });
  return models;
};


/***/ }),

/***/ 3825:
/***/ ((module) => {

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
      middlewares: 'test',
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
      middlewares: 'test',
      meta: { auth: { enable: false } },
    },
    // test/itemOnly/right(checked by middleware)
    {
      method: 'post',
      path: 'test/itemOnly/checkRightCreate',
      controller: 'testItemOnlyRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'a-useronline:userOnlineHistory', action: 'create' } },
    },
    {
      method: 'post',
      path: 'test/itemOnly/createRaw',
      controller: 'testItemOnlyRight',
      middlewares: 'test',
      meta: {},
    },
    {
      method: 'post',
      path: 'test/itemOnly/checkRightRead',
      controller: 'testItemOnlyRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'a-useronline:userOnlineHistory', action: 'read' } },
    },
    {
      method: 'post',
      path: 'test/itemOnly/checkRightWrite',
      controller: 'testItemOnlyRight',
      middlewares: 'test',
      meta: { right: { type: 'atom', atomClass: 'a-useronline:userOnlineHistory', action: 'write' } },
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

    // test/feat/fields
    {
      method: 'post',
      path: 'test/feat/fields/parseSchema',
      controller: 'testFeatFields',
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


/***/ }),

/***/ 9939:
/***/ ((module) => {

module.exports = app => {
  class Party extends app.Service {
    async over({ key, user }) {
      await this.ctx.model.party.update({
        id: key.itemId,
        partyOver: 1,
      });
      await this.ctx.bean.cms.render._renderArticlePush({ key, inner: false });
    }

    async overBulk({ keys, user }) {
      const resKeys = [];
      for (const key of keys) {
        const res = await this._overBulk_item({ key, user });
        if (res) {
          resKeys.push(key);
        }
      }
      return { keys: resKeys };
    }

    async _overBulk_item({ key, user }) {
      // check right
      const res = await this.ctx.bean.atom.checkRightAction({
        atom: { id: key.atomId },
        action: 101,
        user,
      });
      if (!res) return false;
      // over
      await this.over({ key, user });
      // ok
      return true;
    }
  }

  return Party;
};


/***/ }),

/***/ 7214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const party = __webpack_require__(9939);

module.exports = app => {
  const services = {};
  Object.assign(services, {
    party,
  });
  return services;
};


/***/ }),

/***/ 3173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function (path) {
  return __webpack_require__(6712)(path);
};


/***/ }),

/***/ 6712:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 6712;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 7551:
/***/ ((module) => {

"use strict";
module.exports = require("object-hash");

/***/ }),

/***/ 3614:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"id":0,"name":"A# .NET"},{"id":1,"name":"A# (Axiom)"},{"id":2,"name":"A-0 System"},{"id":3,"name":"A+"},{"id":4,"name":"A++"},{"id":5,"name":"ABAP"},{"id":6,"name":"ABC"},{"id":7,"name":"ABC ALGOL"},{"id":8,"name":"ABLE"},{"id":9,"name":"ABSET"},{"id":10,"name":"ABSYS"},{"id":11,"name":"ACC"},{"id":12,"name":"Accent"},{"id":13,"name":"Ace DASL"},{"id":14,"name":"ACL2"},{"id":15,"name":"ACT-III"},{"id":16,"name":"Action!"},{"id":17,"name":"ActionScript"},{"id":18,"name":"Ada"},{"id":19,"name":"Adenine"},{"id":20,"name":"Agda"},{"id":21,"name":"Agilent VEE"},{"id":22,"name":"Agora"},{"id":23,"name":"AIMMS"},{"id":24,"name":"Alef"},{"id":25,"name":"ALF"},{"id":26,"name":"ALGOL 58"},{"id":27,"name":"ALGOL 60"},{"id":28,"name":"ALGOL 68"},{"id":29,"name":"ALGOL W"},{"id":30,"name":"Alice"},{"id":31,"name":"Alma-0"},{"id":32,"name":"AmbientTalk"},{"id":33,"name":"Amiga E"},{"id":34,"name":"AMOS"},{"id":35,"name":"AMPL"},{"id":36,"name":"Apex"},{"id":37,"name":"APL"},{"id":38,"name":"App Inventor for Android\'s visual block language"},{"id":39,"name":"AppleScript"},{"id":40,"name":"Arc"},{"id":41,"name":"ARexx"},{"id":42,"name":"Argus"},{"id":43,"name":"AspectJ"},{"id":44,"name":"Assembly language"},{"id":45,"name":"ATS"},{"id":46,"name":"Ateji PX"},{"id":47,"name":"AutoHotkey"},{"id":48,"name":"Autocoder"},{"id":49,"name":"AutoIt"},{"id":50,"name":"AutoLISP / Visual LISP"},{"id":51,"name":"Averest"},{"id":52,"name":"AWK"},{"id":53,"name":"Axum"},{"id":54,"name":"B"},{"id":55,"name":"Babbage"},{"id":56,"name":"Bash"},{"id":57,"name":"BASIC"},{"id":58,"name":"bc"},{"id":59,"name":"BCPL"},{"id":60,"name":"BeanShell"},{"id":61,"name":"Batch (Windows/Dos)"},{"id":62,"name":"Bertrand"},{"id":63,"name":"BETA"},{"id":64,"name":"Bigwig"},{"id":65,"name":"Bistro"},{"id":66,"name":"BitC"},{"id":67,"name":"BLISS"},{"id":68,"name":"Blue"},{"id":69,"name":"Boo"},{"id":70,"name":"Boomerang"},{"id":71,"name":"Bourne shell"},{"id":72,"name":"bash"},{"id":73,"name":"ksh"},{"id":74,"name":"BREW"},{"id":75,"name":"BPEL"},{"id":76,"name":"C"},{"id":77,"name":"C--"},{"id":78,"name":"C++"},{"id":79,"name":"C#"},{"id":80,"name":"C/AL"},{"id":81,"name":"Caché ObjectScript"},{"id":82,"name":"C Shell"},{"id":83,"name":"Caml"},{"id":84,"name":"Cayenne"},{"id":85,"name":"CDuce"},{"id":86,"name":"Cecil"},{"id":87,"name":"Cel"},{"id":88,"name":"Cesil"},{"id":89,"name":"Ceylon"},{"id":90,"name":"CFEngine"},{"id":91,"name":"CFML"},{"id":92,"name":"Cg"},{"id":93,"name":"Ch"},{"id":94,"name":"Chapel"},{"id":95,"name":"CHAIN"},{"id":96,"name":"Charity"},{"id":97,"name":"Charm"},{"id":98,"name":"Chef"},{"id":99,"name":"CHILL"},{"id":100,"name":"CHIP-8"},{"id":101,"name":"chomski"},{"id":102,"name":"ChucK"},{"id":103,"name":"CICS"},{"id":104,"name":"Cilk"},{"id":105,"name":"CL"},{"id":106,"name":"Claire"},{"id":107,"name":"Clarion"},{"id":108,"name":"Clean"},{"id":109,"name":"Clipper"},{"id":110,"name":"CLIST"},{"id":111,"name":"Clojure"},{"id":112,"name":"CLU"},{"id":113,"name":"CMS-2"},{"id":114,"name":"COBOL"},{"id":115,"name":"Cobra"},{"id":116,"name":"CODE"},{"id":117,"name":"CoffeeScript"},{"id":118,"name":"Cola"},{"id":119,"name":"ColdC"},{"id":120,"name":"ColdFusion"},{"id":121,"name":"COMAL"},{"id":122,"name":"Combined Programming Language"},{"id":123,"name":"COMIT"},{"id":124,"name":"Common Intermediate Language"},{"id":125,"name":"Common Lisp"},{"id":126,"name":"COMPASS"},{"id":127,"name":"Component Pascal"},{"id":128,"name":"Constraint Handling Rules"},{"id":129,"name":"Converge"},{"id":130,"name":"Cool"},{"id":131,"name":"Coq"},{"id":132,"name":"Coral 66"},{"id":133,"name":"Corn"},{"id":134,"name":"CorVision"},{"id":135,"name":"COWSEL"},{"id":136,"name":"CPL"},{"id":137,"name":"csh"},{"id":138,"name":"CSP"},{"id":139,"name":"Cryptol"},{"id":140,"name":"Csound"},{"id":141,"name":"CUDA"},{"id":142,"name":"Curl"},{"id":143,"name":"Curry"},{"id":144,"name":"Cyclone"},{"id":145,"name":"Cython"},{"id":146,"name":"D"},{"id":147,"name":"DASL"},{"id":148,"name":"DASL"},{"id":149,"name":"Dart"},{"id":150,"name":"DataFlex"},{"id":151,"name":"Datalog"},{"id":152,"name":"DATATRIEVE"},{"id":153,"name":"dBase"},{"id":154,"name":"dc"},{"id":155,"name":"DCL"},{"id":156,"name":"Deesel"},{"id":157,"name":"Delphi"},{"id":158,"name":"DinkC"},{"id":159,"name":"DIBOL"},{"id":160,"name":"Dog"},{"id":161,"name":"Draco"},{"id":162,"name":"DRAKON"},{"id":163,"name":"Dylan"},{"id":164,"name":"DYNAMO"},{"id":165,"name":"E"},{"id":166,"name":"E#"},{"id":167,"name":"Ease"},{"id":168,"name":"Easy PL/I"},{"id":169,"name":"Easy Programming Language"},{"id":170,"name":"EASYTRIEVE PLUS"},{"id":171,"name":"ECMAScript"},{"id":172,"name":"Edinburgh IMP"},{"id":173,"name":"EGL"},{"id":174,"name":"Eiffel"},{"id":175,"name":"ELAN"},{"id":176,"name":"Elixir"},{"id":177,"name":"Elm"},{"id":178,"name":"Emacs Lisp"},{"id":179,"name":"Emerald"},{"id":180,"name":"Epigram"},{"id":181,"name":"EPL"},{"id":182,"name":"Erlang"},{"id":183,"name":"es"},{"id":184,"name":"Escher"},{"id":185,"name":"ESPOL"},{"id":186,"name":"Esterel"},{"id":187,"name":"Etoys"},{"id":188,"name":"Euclid"},{"id":189,"name":"Euler"},{"id":190,"name":"Euphoria"},{"id":191,"name":"EusLisp Robot Programming Language"},{"id":192,"name":"CMS EXEC"},{"id":193,"name":"EXEC 2"},{"id":194,"name":"Executable UML"},{"id":195,"name":"F"},{"id":196,"name":"F#"},{"id":197,"name":"Factor"},{"id":198,"name":"Falcon"},{"id":199,"name":"Fantom"},{"id":200,"name":"FAUST"},{"id":201,"name":"FFP"},{"id":202,"name":"Fjölnir"},{"id":203,"name":"FL"},{"id":204,"name":"Flavors"},{"id":205,"name":"Flex"},{"id":206,"name":"FLOW-MATIC"},{"id":207,"name":"FOCAL"},{"id":208,"name":"FOCUS"},{"id":209,"name":"FOIL"},{"id":210,"name":"FORMAC"},{"id":211,"name":"@Formula"},{"id":212,"name":"Forth"},{"id":213,"name":"Fortran"},{"id":214,"name":"Fortress"},{"id":215,"name":"FoxBase"},{"id":216,"name":"FoxPro"},{"id":217,"name":"FP"},{"id":218,"name":"FPr"},{"id":219,"name":"Franz Lisp"},{"id":220,"name":"Frege"},{"id":221,"name":"F-Script"},{"id":222,"name":"G"},{"id":223,"name":"Google Apps Script"},{"id":224,"name":"Game Maker Language"},{"id":225,"name":"GameMonkey Script"},{"id":226,"name":"GAMS"},{"id":227,"name":"GAP"},{"id":228,"name":"G-code"},{"id":229,"name":"Genie"},{"id":230,"name":"GDL"},{"id":231,"name":"GJ"},{"id":232,"name":"GEORGE"},{"id":233,"name":"GLSL"},{"id":234,"name":"GNU E"},{"id":235,"name":"GM"},{"id":236,"name":"Go"},{"id":237,"name":"Go!"},{"id":238,"name":"GOAL"},{"id":239,"name":"Gödel"},{"id":240,"name":"Godiva"},{"id":241,"name":"GOM (Good Old Mad)"},{"id":242,"name":"Goo"},{"id":243,"name":"Gosu"},{"id":244,"name":"GOTRAN"},{"id":245,"name":"GPSS"},{"id":246,"name":"GraphTalk"},{"id":247,"name":"GRASS"},{"id":248,"name":"Groovy"},{"id":249,"name":"Hack"},{"id":250,"name":"HAL/S"},{"id":251,"name":"Hamilton C shell"},{"id":252,"name":"Harbour"},{"id":253,"name":"Hartmann pipelines"},{"id":254,"name":"Haskell"},{"id":255,"name":"Haxe"},{"id":256,"name":"High Level Assembly"},{"id":257,"name":"HLSL"},{"id":258,"name":"Hop"},{"id":259,"name":"Hope"},{"id":260,"name":"Hugo"},{"id":261,"name":"Hume"},{"id":262,"name":"HyperTalk"},{"id":263,"name":"IBM Basic assembly language"},{"id":264,"name":"IBM HAScript"},{"id":265,"name":"IBM Informix-4GL"},{"id":266,"name":"IBM RPG"},{"id":267,"name":"ICI"},{"id":268,"name":"Icon"},{"id":269,"name":"Id"},{"id":270,"name":"IDL"},{"id":271,"name":"Idris"},{"id":272,"name":"IMP"},{"id":273,"name":"Inform"},{"id":274,"name":"Io"},{"id":275,"name":"Ioke"},{"id":276,"name":"IPL"},{"id":277,"name":"IPTSCRAE"},{"id":278,"name":"ISLISP"},{"id":279,"name":"ISPF"},{"id":280,"name":"ISWIM"},{"id":281,"name":"J"},{"id":282,"name":"J#"},{"id":283,"name":"J++"},{"id":284,"name":"JADE"},{"id":285,"name":"Jako"},{"id":286,"name":"JAL"},{"id":287,"name":"Janus"},{"id":288,"name":"JASS"},{"id":289,"name":"Java"},{"id":290,"name":"JavaScript"},{"id":291,"name":"JCL"},{"id":292,"name":"JEAN"},{"id":293,"name":"Join Java"},{"id":294,"name":"JOSS"},{"id":295,"name":"Joule"},{"id":296,"name":"JOVIAL"},{"id":297,"name":"Joy"},{"id":298,"name":"JScript"},{"id":299,"name":"JScript .NET"},{"id":300,"name":"JavaFX Script"},{"id":301,"name":"Julia"},{"id":302,"name":"Jython"},{"id":303,"name":"K"},{"id":304,"name":"Kaleidoscope"},{"id":305,"name":"Karel"},{"id":306,"name":"Karel++"},{"id":307,"name":"KEE"},{"id":308,"name":"Kixtart"},{"id":309,"name":"Klerer-May System"},{"id":310,"name":"KIF"},{"id":311,"name":"Kojo"},{"id":312,"name":"Kotlin"},{"id":313,"name":"KRC"},{"id":314,"name":"KRL"},{"id":315,"name":"KUKA"},{"id":316,"name":"KRYPTON"},{"id":317,"name":"ksh"},{"id":318,"name":"L"},{"id":319,"name":"L# .NET"},{"id":320,"name":"LabVIEW"},{"id":321,"name":"Ladder"},{"id":322,"name":"Lagoona"},{"id":323,"name":"LANSA"},{"id":324,"name":"Lasso"},{"id":325,"name":"LaTeX"},{"id":326,"name":"Lava"},{"id":327,"name":"LC-3"},{"id":328,"name":"Leda"},{"id":329,"name":"Legoscript"},{"id":330,"name":"LIL"},{"id":331,"name":"LilyPond"},{"id":332,"name":"Limbo"},{"id":333,"name":"Limnor"},{"id":334,"name":"LINC"},{"id":335,"name":"Lingo"},{"id":336,"name":"Linoleum"},{"id":337,"name":"LIS"},{"id":338,"name":"LISA"},{"id":339,"name":"Lisaac"},{"id":340,"name":"Lisp"},{"id":341,"name":"Lite-C"},{"id":342,"name":"Lithe"},{"id":343,"name":"Little b"},{"id":344,"name":"Logo"},{"id":345,"name":"Logtalk"},{"id":346,"name":"LotusScript"},{"id":347,"name":"LPC"},{"id":348,"name":"LSE"},{"id":349,"name":"LSL"},{"id":350,"name":"LiveCode"},{"id":351,"name":"LiveScript"},{"id":352,"name":"Lua"},{"id":353,"name":"Lucid"},{"id":354,"name":"Lustre"},{"id":355,"name":"LYaPAS"},{"id":356,"name":"Lynx"},{"id":357,"name":"M2001"},{"id":358,"name":"M4"},{"id":359,"name":"M#"},{"id":360,"name":"Machine code"},{"id":361,"name":"MAD"},{"id":362,"name":"MAD/I"},{"id":363,"name":"Magik"},{"id":364,"name":"Magma"},{"id":365,"name":"make"},{"id":366,"name":"Maple"},{"id":367,"name":"MAPPER"},{"id":368,"name":"MARK-IV"},{"id":369,"name":"Mary"},{"id":370,"name":"MASM Microsoft Assembly x86"},{"id":371,"name":"Mathematica"},{"id":372,"name":"MATLAB"},{"id":373,"name":"Maxima"},{"id":374,"name":"Macsyma"},{"id":375,"name":"Max"},{"id":376,"name":"MaxScript"},{"id":377,"name":"Maya (MEL)"},{"id":378,"name":"MDL"},{"id":379,"name":"Mercury"},{"id":380,"name":"Mesa"},{"id":381,"name":"Metacard"},{"id":382,"name":"Metafont"},{"id":383,"name":"Microcode"},{"id":384,"name":"MicroScript"},{"id":385,"name":"MIIS"},{"id":386,"name":"MillScript"},{"id":387,"name":"MIMIC"},{"id":388,"name":"Mirah"},{"id":389,"name":"Miranda"},{"id":390,"name":"MIVA Script"},{"id":391,"name":"ML"},{"id":392,"name":"Moby"},{"id":393,"name":"Model 204"},{"id":394,"name":"Modelica"},{"id":395,"name":"Modula"},{"id":396,"name":"Modula-2"},{"id":397,"name":"Modula-3"},{"id":398,"name":"Mohol"},{"id":399,"name":"MOO"},{"id":400,"name":"Mortran"},{"id":401,"name":"Mouse"},{"id":402,"name":"MPD"},{"id":403,"name":"CIL"},{"id":404,"name":"MSL"},{"id":405,"name":"MUMPS"},{"id":406,"name":"Mystic Programming Language"},{"id":407,"name":"NASM"},{"id":408,"name":"NATURAL"},{"id":409,"name":"Napier88"},{"id":410,"name":"Neko"},{"id":411,"name":"Nemerle"},{"id":412,"name":"nesC"},{"id":413,"name":"NESL"},{"id":414,"name":"Net.Data"},{"id":415,"name":"NetLogo"},{"id":416,"name":"NetRexx"},{"id":417,"name":"NewLISP"},{"id":418,"name":"NEWP"},{"id":419,"name":"Newspeak"},{"id":420,"name":"NewtonScript"},{"id":421,"name":"NGL"},{"id":422,"name":"Nial"},{"id":423,"name":"Nice"},{"id":424,"name":"Nickle"},{"id":425,"name":"Nim"},{"id":426,"name":"NPL"},{"id":427,"name":"Not eXactly C"},{"id":428,"name":"Not Quite C"},{"id":429,"name":"NSIS"},{"id":430,"name":"Nu"},{"id":431,"name":"NWScript"},{"id":432,"name":"NXT-G"},{"id":433,"name":"o:XML"},{"id":434,"name":"Oak"},{"id":435,"name":"Oberon"},{"id":436,"name":"OBJ2"},{"id":437,"name":"Object Lisp"},{"id":438,"name":"ObjectLOGO"},{"id":439,"name":"Object REXX"},{"id":440,"name":"Object Pascal"},{"id":441,"name":"Objective-C"},{"id":442,"name":"Objective-J"},{"id":443,"name":"Obliq"},{"id":444,"name":"OCaml"},{"id":445,"name":"occam"},{"id":446,"name":"occam-π"},{"id":447,"name":"Octave"},{"id":448,"name":"OmniMark"},{"id":449,"name":"Onyx"},{"id":450,"name":"Opa"},{"id":451,"name":"Opal"},{"id":452,"name":"OpenCL"},{"id":453,"name":"OpenEdge ABL"},{"id":454,"name":"OPL"},{"id":455,"name":"OPS5"},{"id":456,"name":"OptimJ"},{"id":457,"name":"Orc"},{"id":458,"name":"ORCA/Modula-2"},{"id":459,"name":"Oriel"},{"id":460,"name":"Orwell"},{"id":461,"name":"Oxygene"},{"id":462,"name":"Oz"},{"id":463,"name":"P′′"},{"id":464,"name":"P#"},{"id":465,"name":"ParaSail (programming language)"},{"id":466,"name":"PARI/GP"},{"id":467,"name":"Pascal"},{"id":468,"name":"PCASTL"},{"id":469,"name":"PCF"},{"id":470,"name":"PEARL"},{"id":471,"name":"PeopleCode"},{"id":472,"name":"Perl"},{"id":473,"name":"PDL"},{"id":474,"name":"Perl6"},{"id":475,"name":"PHP"},{"id":476,"name":"Phrogram"},{"id":477,"name":"Pico"},{"id":478,"name":"Picolisp"},{"id":479,"name":"Pict"},{"id":480,"name":"Pike"},{"id":481,"name":"PIKT"},{"id":482,"name":"PILOT"},{"id":483,"name":"Pipelines"},{"id":484,"name":"Pizza"},{"id":485,"name":"PL-11"},{"id":486,"name":"PL/0"},{"id":487,"name":"PL/B"},{"id":488,"name":"PL/C"},{"id":489,"name":"PL/I"},{"id":490,"name":"PL/M"},{"id":491,"name":"PL/P"},{"id":492,"name":"PL/SQL"},{"id":493,"name":"PL360"},{"id":494,"name":"PLANC"},{"id":495,"name":"Plankalkül"},{"id":496,"name":"Planner"},{"id":497,"name":"PLEX"},{"id":498,"name":"PLEXIL"},{"id":499,"name":"Plus"},{"id":500,"name":"POP-11"},{"id":501,"name":"PostScript"},{"id":502,"name":"PortablE"},{"id":503,"name":"Powerhouse"},{"id":504,"name":"PowerBuilder"},{"id":505,"name":"PowerShell"},{"id":506,"name":"PPL"},{"id":507,"name":"Processing"},{"id":508,"name":"Processing.js"},{"id":509,"name":"Prograph"},{"id":510,"name":"PROIV"},{"id":511,"name":"Prolog"},{"id":512,"name":"PROMAL"},{"id":513,"name":"Promela"},{"id":514,"name":"PROSE modeling language"},{"id":515,"name":"PROTEL"},{"id":516,"name":"ProvideX"},{"id":517,"name":"Pro*C"},{"id":518,"name":"Pure"},{"id":519,"name":"Python"},{"id":520,"name":"Q (equational programming language)"},{"id":521,"name":"Q (programming language from Kx Systems)"},{"id":522,"name":"Qalb"},{"id":523,"name":"QtScript"},{"id":524,"name":"QuakeC"},{"id":525,"name":"QPL"},{"id":526,"name":"R"},{"id":527,"name":"R++"},{"id":528,"name":"Racket"},{"id":529,"name":"RAPID"},{"id":530,"name":"Rapira"},{"id":531,"name":"Ratfiv"},{"id":532,"name":"Ratfor"},{"id":533,"name":"rc"},{"id":534,"name":"REBOL"},{"id":535,"name":"Red"},{"id":536,"name":"Redcode"},{"id":537,"name":"REFAL"},{"id":538,"name":"Reia"},{"id":539,"name":"Revolution"},{"id":540,"name":"rex"},{"id":541,"name":"REXX"},{"id":542,"name":"Rlab"},{"id":543,"name":"ROOP"},{"id":544,"name":"RPG"},{"id":545,"name":"RPL"},{"id":546,"name":"RSL"},{"id":547,"name":"RTL/2"},{"id":548,"name":"Ruby"},{"id":549,"name":"RuneScript"},{"id":550,"name":"Rust"},{"id":551,"name":"S"},{"id":552,"name":"S2"},{"id":553,"name":"S3"},{"id":554,"name":"S-Lang"},{"id":555,"name":"S-PLUS"},{"id":556,"name":"SA-C"},{"id":557,"name":"SabreTalk"},{"id":558,"name":"SAIL"},{"id":559,"name":"SALSA"},{"id":560,"name":"SAM76"},{"id":561,"name":"SAS"},{"id":562,"name":"SASL"},{"id":563,"name":"Sather"},{"id":564,"name":"Sawzall"},{"id":565,"name":"SBL"},{"id":566,"name":"Scala"},{"id":567,"name":"Scheme"},{"id":568,"name":"Scilab"},{"id":569,"name":"Scratch"},{"id":570,"name":"Script.NET"},{"id":571,"name":"Sed"},{"id":572,"name":"Seed7"},{"id":573,"name":"Self"},{"id":574,"name":"SenseTalk"},{"id":575,"name":"SequenceL"},{"id":576,"name":"SETL"},{"id":577,"name":"SIMPOL"},{"id":578,"name":"SIGNAL"},{"id":579,"name":"SiMPLE"},{"id":580,"name":"SIMSCRIPT"},{"id":581,"name":"Simula"},{"id":582,"name":"Simulink"},{"id":583,"name":"SISAL"},{"id":584,"name":"SLIP"},{"id":585,"name":"SMALL"},{"id":586,"name":"Smalltalk"},{"id":587,"name":"Small Basic"},{"id":588,"name":"SML"},{"id":589,"name":"Snap!"},{"id":590,"name":"SNOBOL"},{"id":591,"name":"SPITBOL"},{"id":592,"name":"Snowball"},{"id":593,"name":"SOL"},{"id":594,"name":"Span"},{"id":595,"name":"SPARK"},{"id":596,"name":"Speedcode"},{"id":597,"name":"SPIN"},{"id":598,"name":"SP/k"},{"id":599,"name":"SPS"},{"id":600,"name":"SQR"},{"id":601,"name":"Squeak"},{"id":602,"name":"Squirrel"},{"id":603,"name":"SR"},{"id":604,"name":"S/SL"},{"id":605,"name":"Stackless Python"},{"id":606,"name":"Starlogo"},{"id":607,"name":"Strand"},{"id":608,"name":"Stata"},{"id":609,"name":"Stateflow"},{"id":610,"name":"Subtext"},{"id":611,"name":"SuperCollider"},{"id":612,"name":"SuperTalk"},{"id":613,"name":"Swift (Apple programming language)"},{"id":614,"name":"Swift (parallel scripting language)"},{"id":615,"name":"SYMPL"},{"id":616,"name":"SyncCharts"},{"id":617,"name":"SystemVerilog"},{"id":618,"name":"T"},{"id":619,"name":"TACL"},{"id":620,"name":"TACPOL"},{"id":621,"name":"TADS"},{"id":622,"name":"TAL"},{"id":623,"name":"Tcl"},{"id":624,"name":"Tea"},{"id":625,"name":"TECO"},{"id":626,"name":"TELCOMP"},{"id":627,"name":"TeX"},{"id":628,"name":"TEX"},{"id":629,"name":"TIE"},{"id":630,"name":"Timber"},{"id":631,"name":"TMG"},{"id":632,"name":"Tom"},{"id":633,"name":"TOM"},{"id":634,"name":"TouchDevelop"},{"id":635,"name":"Topspeed"},{"id":636,"name":"TPU"},{"id":637,"name":"Trac"},{"id":638,"name":"TTM"},{"id":639,"name":"T-SQL"},{"id":640,"name":"TTCN"},{"id":641,"name":"Turing"},{"id":642,"name":"TUTOR"},{"id":643,"name":"TXL"},{"id":644,"name":"TypeScript"},{"id":645,"name":"Turbo C++"},{"id":646,"name":"Ubercode"},{"id":647,"name":"UCSD Pascal"},{"id":648,"name":"Umple"},{"id":649,"name":"Unicon"},{"id":650,"name":"Uniface"},{"id":651,"name":"UNITY"},{"id":652,"name":"Unix shell"},{"id":653,"name":"UnrealScript"},{"id":654,"name":"Vala"},{"id":655,"name":"VBA"},{"id":656,"name":"VBScript"},{"id":657,"name":"Verilog"},{"id":658,"name":"VHDL"},{"id":659,"name":"Visual Basic"},{"id":660,"name":"Visual Basic .NET"},{"id":661,"name":"Visual DataFlex"},{"id":662,"name":"Visual DialogScript"},{"id":663,"name":"Visual Fortran"},{"id":664,"name":"Visual FoxPro"},{"id":665,"name":"Visual J++"},{"id":666,"name":"Visual J#"},{"id":667,"name":"Visual Objects"},{"id":668,"name":"Visual Prolog"},{"id":669,"name":"VSXu"},{"id":670,"name":"vvvv"},{"id":671,"name":"WATFIV, WATFOR"},{"id":672,"name":"WebDNA"},{"id":673,"name":"WebQL"},{"id":674,"name":"Windows PowerShell"},{"id":675,"name":"Winbatch"},{"id":676,"name":"Wolfram Language"},{"id":677,"name":"Wyvern"},{"id":678,"name":"X++"},{"id":679,"name":"X#"},{"id":680,"name":"X10"},{"id":681,"name":"XBL"},{"id":682,"name":"XC"},{"id":683,"name":"XMOS architecture"},{"id":684,"name":"xHarbour"},{"id":685,"name":"XL"},{"id":686,"name":"Xojo"},{"id":687,"name":"XOTcl"},{"id":688,"name":"XPL"},{"id":689,"name":"XPL0"},{"id":690,"name":"XQuery"},{"id":691,"name":"XSB"},{"id":692,"name":"XSLT"},{"id":693,"name":"XPath"},{"id":694,"name":"Xtend"},{"id":695,"name":"Yorick"},{"id":696,"name":"YQL"},{"id":697,"name":"Z notation"},{"id":698,"name":"Zeno"},{"id":699,"name":"ZOPL"},{"id":700,"name":"ZPL"}]');

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(9421);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;