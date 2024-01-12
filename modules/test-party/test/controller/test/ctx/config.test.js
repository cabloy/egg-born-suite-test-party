const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/ctx/config.test.js', () => {
  it('action:config', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/config/test', false),
    });
  });
});
