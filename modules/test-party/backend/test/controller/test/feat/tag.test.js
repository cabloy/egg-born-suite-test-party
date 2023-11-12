const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/tag.test.js', () => {
  it('action:tag', async () => {
    // ctx
    const ctx = await app.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/tag', false),
    });
  });
});
