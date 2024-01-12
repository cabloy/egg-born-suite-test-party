const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/httpLog.test.js', () => {
  it('action:httpLog', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/httpLog?name=zhennann', false),
      body: {
        sex: 1,
      },
    });
  });
});
