const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/queue.test.js', () => {
  it('action:queue', async () => {
    // ctx
    const ctx = await app.mockCtx();

    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/pushAsync', false),
    });

    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/push', false),
    });
  });
});
