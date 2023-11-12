const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/itemOnly/all.test.js', () => {
  it('action:atomOnly-all', async () => {
    // ctx
    const ctx = await app.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/itemOnly/all', false),
    });
  });
});
