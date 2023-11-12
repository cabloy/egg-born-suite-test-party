const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/cache/mem.test.js', () => {
  it('action:cache:mem', async () => {
    // ctx
    const ctx = await app.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/cache/mem', false),
    });
  });
});
