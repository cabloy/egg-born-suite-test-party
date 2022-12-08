const require3 = require('require3');
const assert = require3('assert');

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class AreaScopeController extends app.Controller {
    async areaScope() {
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
      const userJimmy = await this.ctx.bean.user.get({ userName: 'jimmy' });
      const userRose = await this.ctx.bean.user.get({ userName: 'rose' });
      const roleFriend = await this.ctx.bean.role.parseRoleName({ roleName: 'friend' });
      assert.equal(!!userJimmy, true);
      assert.equal(!!userRose, true);
      assert.equal(!!roleFriend, true);
      // 1. jimmy: 创建party数据，标题:areaScopeTest001，归属角色：friend，区域：中国|河南|濮阳

      // 9.

      // ok
      this.ctx.success();
    }
  }

  return AreaScopeController;
};
