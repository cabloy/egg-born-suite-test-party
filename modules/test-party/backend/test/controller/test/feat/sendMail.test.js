const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/feat/sendMail.test.js', () => {
  it('action:sendMail', async () => {
    // ctx
    const ctx = await app.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/sendMail', false),
      body: {
        data: {
          to: 'test@cabloy.com',
          subject: 'this is a test',
          text: 'message body!',
        },
      },
    });
  });
});
