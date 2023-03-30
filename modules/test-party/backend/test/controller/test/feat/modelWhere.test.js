const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/modelWhere.test.js', () => {
  it('action:modelWhere', async () => {
    const result = await app.httpRequest().get(mockUrl('test/feat/modelWhere'));
    assert.equal(result.body.code, 0);
  });
});
