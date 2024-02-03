// @ts-ignore: utils
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('action: atom: party', () => {
  it('[atom]', async () => {
    const url = mockUrl('test/atom/all', false);
    const moduleName = mockInfo().relativeName;
    console.log(url, moduleName);
  });
});
// return;
// describe.only('action: atom: party', () => {
//   it('[atom]', async () => {
//     // ctx
//     const ctx = await app.meta.mockUtil.mockCtx();

//     // atomClass info
//     const atomClassModule = mockInfo().relativeName;
//     const atomClassName = 'party';
//     const atomClass = { module: atomClassModule, atomClassName };

//     // login as root
//     await ctx.meta.mockUtil.login({ auth: 'root' });

//     // create
//     const keyDraft = await ctx.meta.util.performAction({
//       innerAccess: false,
//       method: 'post',
//       url: '/a/base/atom/write',
//       body: {
//         atomClass,
//         item: {
//           atomName: 'party demo',
//           personCount: 3,
//         },
//       },
//     });
//     assert(!!keyDraft);

//     // submit
//     let data = await ctx.meta.util.performAction({
//       innerAccess: false,
//       method: 'post',
//       url: '/a/base/atom/submit',
//       body: {
//         key: keyDraft,
//         atomClass,
//       },
//     });
//     const keyFormal = data.formal.key;
//     assert(!!keyFormal);

//     // read
//     data = await ctx.meta.util.performAction({
//       innerAccess: false,
//       method: 'post',
//       url: '/a/base/atom/read',
//       body: {
//         key: keyFormal,
//         atomClass,
//       },
//     });
//     assert(!!data);

//     // delete
//     await ctx.meta.util.performAction({
//       innerAccess: false,
//       method: 'post',
//       url: '/a/base/atom/delete',
//       body: {
//         key: keyFormal,
//         atomClass,
//       },
//     });
//   });
// });
