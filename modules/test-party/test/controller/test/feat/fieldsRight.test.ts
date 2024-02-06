// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/feat/fieldsRight.test.js', () => {
  it('action:fieldsRight:parseSchema', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/fieldsRight/parseSchema', false),
    });
  });
});
