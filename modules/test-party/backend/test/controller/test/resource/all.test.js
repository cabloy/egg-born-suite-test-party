const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/resource/all.test.js', () => {
  it('action:all', async () => {
    // ctx
    const ctx = await app.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/resource/all', false),
    });
  });
});
