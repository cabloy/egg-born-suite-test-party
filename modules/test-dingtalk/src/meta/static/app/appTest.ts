// http://localhost:9192/?appKey=test-dingtalk:appTest
// const moduleInfo = module.info;

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
  atomRevision: 4,
  atomCategoryId: 'DemoIsolateApp',
  description: '',
  appIcon: ':auth:dingtalk-square',
  appIsolate: true,
  content: JSON.stringify(content),
  resourceRoles: 'authenticated',
  appSorting: 0,
};
module.exports = _app;
