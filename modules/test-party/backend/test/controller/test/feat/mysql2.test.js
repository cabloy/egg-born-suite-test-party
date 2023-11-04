const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/mysql2.test.js', () => {
  it('action:mysql2', async () => {
    app.mockSession({});

    // atomClass info
    const atomClassModule = mockInfo().relativeName;
    const atomClassName = 'party';

    // login as root
    await app
      .httpRequest()
      .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
      .send({
        data: {
          auth: 'root',
          password: '123456',
        },
      });

    // create
    let result = await app
      .httpRequest()
      .post(mockUrl('/a/base/atom/write'))
      .send({
        atomClass: { module: atomClassModule, atomClassName },
      });
    assert(result.body.code === 0);
    const keyDraft = result.body.data;

    // query
    result = await app
      .httpRequest()
      .post(mockUrl('/a/base/db/queryOne'))
      .send({
        sql: 'select a.*,b.* from aAtom a, testParty b where a.id=b.atomId and a.id=?',
        params: [keyDraft.atomId],
      });
    assert.equal(result.body.code, 0);
    assert.equal(result.body.data.id, keyDraft.itemId);

    // query
    result = await app
      .httpRequest()
      .post(mockUrl('/a/base/db/queryOne'))
      .send({
        sql: 'select b.*,a.* from aAtom a, testParty b where a.id=b.atomId and a.id=?',
        params: [keyDraft.atomId],
      });
    assert.equal(result.body.code, 0);
    assert.equal(result.body.data.id, keyDraft.atomId);

    // delete
    result = await app.httpRequest().post(mockUrl('/a/base/atom/delete')).send({
      key: keyDraft,
    });
    assert(result.body.code === 0);
  });
});
