const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/multilevelAuthorization/role.test.js', () => {
  it('action:multilevelAuthorization:role', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/multilevelAuthorization/role', false),
    });
  });
});
