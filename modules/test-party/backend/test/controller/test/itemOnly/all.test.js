const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe.only('test/controller/test/itemOnly/all.test.js', () => {
  it('action:atomOnly-all', async () => {
    const result = await app.httpRequest().post(mockUrl('test/itemOnly/all'));
    assert.equal(result.body.code, 0);
  });
});
