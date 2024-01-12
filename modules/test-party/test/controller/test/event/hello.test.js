const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/event/hello.test.js', () => {
  it('action:event:hello', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/event/hello', false),
    });
  });
});
