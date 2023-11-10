const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/ctx/session.test.js', () => {
  it('action:session', async () => {
    // ctx
    const ctx = await app.mockCtx({ new: true });

    // anonymous
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/session', false),
    });

    // login
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // test again
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/session', false),
    });
  });
});
