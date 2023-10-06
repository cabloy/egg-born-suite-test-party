const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/fieldsRight.test.js', () => {
  it('action:fieldsRight:parseSchema', async () => {
    const result = await app.httpRequest().post(mockUrl('test/feat/fieldsRight/parseSchema'));
    assert.equal(result.body.code, 0);
  });
});
