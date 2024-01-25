import { BeanBase } from '@cabloy/core';
import testData from '../test/testData.js';

export class VersionInit extends BeanBase {
  async run() {
    await this._init_rights();
    await this._init_testData();
  }

  async _init_rights() {
    // // types
    // for (const name of ['Birthday', 'Dance', 'Garden']) {
    //   await this.ctx.model.partyType.insert({ name });
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
      { roleName: 'system', action: 'partyOverOtherTest1', scopeNames: 0 },
      { roleName: 'system', action: 'partyOverBulk' },
    ];
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'party', roleRights });
  }

  async _init_testData() {
    // roles
    const roleIds = await this._testRoles();

    // role includes
    await this._testRoleIncs(roleIds);

    // set role dirty
    await this.ctx.bean.role.setDirty(true);

    // users
    const userIds = await this._testUsers(roleIds);

    // role rights
    await this._testRoleRights(roleIds);

    // cache
    this._testCache(roleIds, userIds);
  }

  _testCache(roleIds, userIds) {
    // cache roles
    this.ctx.cache.mem.set('roleIds', roleIds);
    // cache users
    this.ctx.cache.mem.set('userIds', userIds);
  }

  // roles
  async _testRoles() {
    const roleIds = {};
    // system roles
    for (const roleName of this.ctx.constant.module('a-base').systemRoles) {
      const role = await this.ctx.bean.role.getSystemRole({ roleName });
      roleIds[roleName] = role.id;
    }
    // roles
    for (const [roleName, leader, catalog, roleNameParent] of testData.roles) {
      roleIds[roleName] = await this.ctx.bean.role.add({
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
      await this.ctx.bean.role.addRoleInc({
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
        userIds[userName] = await this.ctx.bean.user.add({
          userName,
          realName: userName,
        });
        // activated
        await this.ctx.bean.user.save({
          user: { id: userIds[userName], activated: 1 },
        });
      }
      // role
      await this.ctx.bean.role.addUserRole({
        userId: userIds[userName],
        roleId: roleIds[roleName],
      });
    }

    // auths
    await this._testAuths(userIds);

    // root
    const userRoot = await this.ctx.bean.user.get({ userName: 'root' });
    userIds.root = userRoot.id;
    return userIds;
  }

  // role rights
  async _testRoleRights() {
    // atomClass: party
    await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'party', roleRights: testData.roleRights });
    // atomClass: role
    await this.ctx.bean.role.addRoleRightBatch({
      module: 'a-base',
      atomClassName: 'role',
      roleRights: testData.roleRightsRole,
    });
    // atomClass: user
    await this.ctx.bean.role.addRoleRightBatch({
      module: 'a-base',
      atomClassName: 'user',
      roleRights: testData.roleRightsUser,
    });
  }

  // auths
  async _testAuths(userIds) {
    for (const userName in userIds) {
      await this.ctx.bean.authSimple.add({
        userId: userIds[userName],
        password: '',
      });
    }
  }
}
