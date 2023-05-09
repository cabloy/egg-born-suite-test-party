const testData = require('./testData.js');

module.exports = function (ctx) {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionInit {
    async run() {
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
