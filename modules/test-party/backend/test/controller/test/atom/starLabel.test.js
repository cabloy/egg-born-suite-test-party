const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/atom/starLabel.test.js', () => {
  it('action:starLabel', async () => {
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

    // do
    const result = await app.httpRequest().post(mockUrl('test/atom/starLabel'));
    assert.equal(result.body.code, 0);
  });
});
