// http://localhost:9192/?appKey=test-dingtalk:appTest
module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    presets: {
      authenticated: {
        // mobile: {
        //   layout: 'test-dingtalk:layoutTest',
        // },
        mobile: {
          menu: {
            layout: 'test-dingtalk:layoutAppMenuTest',
          },
        },
        pc: {
          menu: {
            layout: 'test-dingtalk:layoutAppMenuTest',
          },
        },
      },
    },
  };
  const _app = {
    atomName: 'Test(Dingtalk)',
    atomStaticKey: 'appTest',
    atomRevision: 2,
    atomCategoryId: 'Demonstration',
    description: '',
    appIcon: ':auth:dingtalk-square',
    appIsolate: true,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};
