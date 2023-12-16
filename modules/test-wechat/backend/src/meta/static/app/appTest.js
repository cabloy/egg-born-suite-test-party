// http://localhost:9192/?appKey=test-wechat:appTest
// const moduleInfo = module.info;

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
  atomRevision: 2,
  atomCategoryId: 'DemoIsolateApp',
  description: '',
  appIcon: ':auth:wechat-outline',
  appIsolate: true,
  content: JSON.stringify(content),
  resourceRoles: 'authenticated',
  appSorting: 0,
};
module.exports = _app;
