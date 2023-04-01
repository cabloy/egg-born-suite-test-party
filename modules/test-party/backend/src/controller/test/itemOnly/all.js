const require3 = require('require3');
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

      return;

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

      // Tom delete party
      await this.ctx.bean.atom.delete({
        key: itemKey,
        atomClass,
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
