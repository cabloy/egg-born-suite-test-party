// http://localhost:9192/?appKey=test-wxwork:appTest
module.exports = app => {
  // const moduleInfo = module.info;
  const content = {
    presets: {
      authenticated: {
        // mobile: {
        //   layout: 'test-wxwork:layoutTest',
        // },
        mobile: {
          menu: {
            layout: 'test-wxwork:layoutAppMenuTest',
          },
        },
        pc: {
          menu: {
            layout: 'test-wxwork:layoutAppMenuTest',
          },
        },
      },
    },
  };
  const _app = {
    atomName: 'Test(Wechat Work)',
    atomStaticKey: 'appTest',
    atomRevision: 3,
    atomCategoryId: 'DemoIsolateApp',
    description: '',
    appIcon: ':auth:wxwork-outline',
    appIsolate: true,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};
