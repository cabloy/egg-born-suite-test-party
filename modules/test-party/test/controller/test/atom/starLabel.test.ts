const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/atom/starLabel.test.js', () => {
  it('action:starLabel', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login
    await ctx.meta.mockUtil.login({ auth: 'Tom' });

    // do
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/atom/starLabel', false),
    });
  });
});
