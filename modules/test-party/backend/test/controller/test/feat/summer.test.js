const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe.only('test/controller/test/feat/summer.test.js', () => {
  it('action:summer', async () => {
    const result = await app.httpRequest().post(mockUrl('test/feat/summer'));
    assert.equal(result.body.code, 0);
  });
});
