const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe.only('test/controller/test/feat/areaScope.test.js', () => {
  it('action:bean', async () => {
    const result = await app.httpRequest().get(mockUrl('test/feat/areaScope'));
    assert.equal(result.body.code, 0);
  });
});
