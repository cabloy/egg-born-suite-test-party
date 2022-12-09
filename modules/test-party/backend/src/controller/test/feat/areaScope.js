const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const __atomClassParty = {
    module: moduleInfo.relativeName,
    atomClassName: 'party',
  };
  class AreaScopeController extends app.Controller {
    async areaScope() {
      if (!this.ctx.bean.areaScope.areaScopeEnabled()) {
        // do nothing
        this.ctx.success();
        return;
      }
      // 测试序列
      //   0. 说明：jimmy和rose均属于角色：friend
      //   1. jimmy: 创建party数据，标题:areaScopeTest001，归属角色：friend，区域：中国|河南|濮阳
      //   2. rose: select/read，均查不到areaScopeTest001
      //   3. rose: 分配权限：可以查看角色：friend的权限，区域为空
      //   4. rose: select/read，可以查看areaScopeTest001
      //   5. rose: 删除旧权限，重新分配权限：可以查看角色：friend的权限，区域为中国|四川
      //   6. rose: select/read，均查不到areaScopeTest001
      //   7. rose: 删除旧权限，重新分配权限：可以查看角色：friend的权限，区域为中国|河南
      //   8. rose: select/read，可以查看areaScopeTest001
      //   9. 清理测试数据：areaScopeTest001 / rose权限

      // 准备数据
      const userRoot = await this.ctx.bean.user.get({ userName: 'root' });
      const userJimmy = await this.ctx.bean.user.get({ userName: 'jimmy' });
      const userRose = await this.ctx.bean.user.get({ userName: 'rose' });
      const roleFriend = await this.ctx.bean.role.parseRoleName({ roleName: 'friend' });
      assert.equal(!!userJimmy, true);
      assert.equal(!!userRose, true);
      assert.equal(!!roleFriend, true);

      // 1. jimmy: 创建party数据，标题:areaScopeTest001，归属角色：friend，区域：中国|河南|濮阳
      const atomName = 'areaScopeTest001';
      const partyKeyDraft = await this.ctx.bean.atom.create({
        atomClass: __atomClassParty,
        roleIdOwner: roleFriend.id,
        options: {
          // preferredRole: true
        },
        user: userJimmy,
      });

      // write party
      await this.ctx.bean.atom.write({
        key: partyKeyDraft,
        item: {
          atomName,
          partyCountry: '86',
          partyCity: '410000/410900/410902',
        },
        user: userJimmy,
      });

      // submit party
      const res = await this.ctx.bean.atom.submit({
        key: partyKeyDraft,
        options: { ignoreFlow: true },
        user: userJimmy,
      });
      const partyKeyFormal = res.formal.key;
      // get party
      const party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user: userJimmy });
      assert.equal(party.atomName, atomName);

      // 2. rose: select/read，均查不到areaScopeTest001
      await this._checkRight({ user: userRose, party, shouldExists: false, step: 2 });

      // 3. rose: 分配权限：可以查看角色：friend的权限，区域为空
      let roleRightId = await this.ctx.bean.role.addRoleRight({
        roleId: roleFriend.id,
        atomClassId: party.atomClassId,
        action: 2, // read
        scope: [roleFriend.id],
        user: userRoot,
      });

      // 4. rose: select/read，可以查看areaScopeTest001
      await this._checkRight({ user: userRose, party, shouldExists: true, step: 4 });

      // 5. rose: 删除旧权限，重新分配权限：可以查看角色：friend的权限，区域为中国|四川
      await this.ctx.bean.role.deleteRoleRight({ roleId: roleFriend.id, roleRightId, user: userRoot });
      roleRightId = await this.ctx.bean.role.addRoleRight({
        roleId: roleFriend.id,
        atomClassId: party.atomClassId,
        action: 2, // read
        scope: [roleFriend.id],
        areaKey: 'partyCountry|partyCity',
        areaScope: '86|510000',
        user: userRoot,
      });
      // 6. rose: select/read，均查不到areaScopeTest001
      await this._checkRight({ user: userRose, party, shouldExists: false, step: 6 });
      // 7. rose: 删除旧权限，重新分配权限：可以查看角色：friend的权限，区域为中国|河南
      await this.ctx.bean.role.deleteRoleRight({ roleId: roleFriend.id, roleRightId, user: userRoot });
      roleRightId = await this.ctx.bean.role.addRoleRight({
        roleId: roleFriend.id,
        atomClassId: party.atomClassId,
        action: 2, // read
        scope: [roleFriend.id],
        areaKey: 'partyCountry|partyCity',
        areaScope: '86|410000',
        user: userRoot,
      });
      // 8. rose: select/read，可以查看areaScopeTest001
      await this._checkRight({ user: userRose, party, shouldExists: true, step: 8 });
      // 9. 清理测试数据：areaScopeTest001 / rose权限
      await this.ctx.bean.atom.delete({ key: partyKeyFormal, user: userJimmy });
      await this.ctx.bean.role.deleteRoleRight({ roleId: roleFriend.id, roleRightId, user: userRoot });
      // ok
      this.ctx.success();
    }

    async _checkRight({ user, party, shouldExists, step }) {
      const stepText = `step: ${step}`;
      const checkItems = await this.ctx.bean.atom.select({
        user,
        options: {
          where: { atomName: party.atomName },
          stage: 'formal',
        },
      });
      assert.equal(checkItems.length > 0, shouldExists, stepText);

      const checkRightRead = await this.ctx.bean.atom.checkRightRead({
        atom: { id: party.atomId },
        user,
      });
      assert.equal(!!checkRightRead, shouldExists, stepText);
    }
  }

  return AreaScopeController;
};
