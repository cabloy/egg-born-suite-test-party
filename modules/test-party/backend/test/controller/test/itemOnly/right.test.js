const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

// atomClass
const atomClass = {
  module: 'a-useronline',
  atomClassName: 'userOnlineHistory',
};

describe.only('test/controller/test/itemOnly/right.test.js', () => {
  it('action:checkRightCreate', async () => {
    app.mockSession({});

    const checkRightCreates = [
      ['Tom', false],
      ['root', false],
    ];
    for (const [userName, right] of checkRightCreates) {
      // login
      await app
        .httpRequest()
        .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
        .send({
          data: {
            auth: userName,
            password: '123456',
          },
        });
      // checkRightCreate
      const result = await app.httpRequest().post(mockUrl('test/itemOnly/checkRightCreate')).send({
        atomClass,
      });
      if (right) {
        assert.equal(result.body.data.id > 0, true);
      } else {
        assert.equal(result.status, 403);
      }
    }
  });

  it('action:checkRight', async () => {
    app.mockSession({});

    // login
    await app
      .httpRequest()
      .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
      .send({
        data: {
          auth: 'Tom',
          password: '123456',
        },
      });

    // create
    let res = await app.httpRequest().post(mockUrl('test/itemOnly/createRaw')).send({
      atomClass,
    });
    const itemKey = res.body.data;

    // check right read
    const checkRightReads = [
      ['Tom', false],
      ['root', true],
    ];
    for (const [userName, right] of checkRightReads) {
      // login
      await app
        .httpRequest()
        .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
        .send({
          data: {
            auth: userName,
            password: '123456',
          },
        });
      // checkRightRead
      const result = await app.httpRequest().post(mockUrl('test/itemOnly/checkRightRead')).send({
        key: itemKey,
        atomClass,
      });
      if (right) {
        assert.equal(result.body.data.atomId, itemKey.atomId);
      } else {
        assert.equal(result.status, 403);
      }
    }

    // check right write
    const checkRightWrites = [
      ['Tom', false],
      ['root', false],
    ];
    for (const [userName, right] of checkRightWrites) {
      // login
      await app
        .httpRequest()
        .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
        .send({
          data: {
            auth: userName,
            password: '123456',
          },
        });
      // checkRightWrite
      const result = await app.httpRequest().post(mockUrl('test/itemOnly/checkRightWrite')).send({
        key: itemKey,
        atomClass,
      });
      if (right) {
        assert.equal(result.body.data.atomId, itemKey.atomId);
      } else {
        assert.equal(result.status, 403);
      }
    }

    // delete
    await app
      .httpRequest()
      .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
      .send({
        data: {
          auth: 'root',
          password: '123456',
        },
      });
    res = await app.httpRequest().post(mockUrl('/a/base/atom/delete')).send({
      key: itemKey,
      atomClass,
    });
    assert.equal(res.body.code, 0);
  });
});
