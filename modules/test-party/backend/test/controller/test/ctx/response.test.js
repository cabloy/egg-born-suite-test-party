const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('test/controller/test/ctx/response.test.js', () => {
  it('action:response:success', async () => {
    // ctx
    const ctx = await app.mockCtx();
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/response/success', false),
    });
    assert.equal(data.userName, 'zhennann');
  });

  it('action:response:successMore', async () => {
    // ctx
    const ctx = await app.mockCtx();
    const page = { index: 0, size: 10 };
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/response/successMore', false),
      body: {
        page,
      },
    });
    assert.equal(data.index, 2);
    assert.equal(data.finished, true);
    assert.equal(data.list.length, 2);
  });

  it('action:response:fail', async () => {
    // ctx
    const ctx = await app.mockCtx({ locale: 'zh-cn' });
    await ctx.meta.mockUtil.catchError(
      async function () {
        return await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/response/fail', false),
        });
      },
      async function (err) {
        assert.equal(err.code, 'test-party:1001');
        assert.equal(err.message, '错误测试');
      }
    );
  });

  it('action:response:throwError', async () => {
    // ctx
    const ctx = await app.mockCtx({ locale: 'zh-cn' });
    await ctx.meta.mockUtil.catchError(
      async function () {
        return await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/response/throwError', false),
        });
      },
      async function (err) {
        assert.equal(err.code, 'test-party:1001');
        assert.equal(err.message, '错误测试');
      }
    );
  });
});
