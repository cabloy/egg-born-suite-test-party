const require3 = require('require3');
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
