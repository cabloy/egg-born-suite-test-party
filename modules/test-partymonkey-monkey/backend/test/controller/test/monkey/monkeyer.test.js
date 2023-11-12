const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/monkey/monkeyer.test.js', () => {
  it('action:test', async () => {
    // ctx
    const ctx = await app.mockCtx();
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/test/party/test/monkey/monkeyee/test', false),
    });
    assert.equal(data.moduleName, 'test-partymonkey');
    assert.equal(data.monkeyed, true);
  });
});
