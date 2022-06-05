// http://localhost:9192/?appKey=test-wechat:appTest
module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    presets: {
      authenticated: {
        // mobile: {
        //   layout: 'test-wechat:layoutTest',
        // },
        mobile: {
          menu: {
            layout: 'test-wechat:layoutAppMenuTest',
          },
        },
        pc: {
          menu: {
            layout: 'test-wechat:layoutAppMenuTest',
          },
        },
      },
    },
  };
  const _app = {
    atomName: 'Test(Wechat)',
    atomStaticKey: 'appTest',
    atomRevision: 1,
    atomCategoryId: 'Demonstration',
    description: '',
    appIcon: ':auth:wechat-outline',
    appIsolate: true,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};
