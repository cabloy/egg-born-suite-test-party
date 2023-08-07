const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/fields.test.js', () => {
  it('action:fields:parseSchema', async () => {
    const result = await app.httpRequest().post(mockUrl('test/feat/fields/parseSchema'));
    assert.equal(result.body.code, 0);
  });
});
