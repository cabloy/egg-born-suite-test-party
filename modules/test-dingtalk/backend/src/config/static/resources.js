module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // tabbar buttons
    {
      atomName: 'Test',
      description: 'Tabbar Button: Test(Dingtalk)',
      atomStaticKey: 'buttonTest',
      atomRevision: 1,
      atomCategoryId: 'a-layoutmobile:button.General',
      resourceType: 'a-layoutmobile:button',
      resourceConfig: JSON.stringify({
        module: 'a-layoutmobile',
        component: 'buttonLink',
        icon: { f7: '::group-work' },
        url: '/test/dingtalk/test/index',
      }),
      resourceRoles: 'root',
    },
    {
      atomName: 'DingTalk',
      atomStaticKey: 'OpenIsolateAppDingtalk',
      atomRevision: 7,
      atomCategoryId: 'a-base:menu.OpenIsolateApp',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: 'a-app',
        actionComponent: 'actionTools',
        name: 'openApp',
        appKey: 'test-dingtalk:appTest',
        appLanguage: null,
        appIsolate: true,
        external: true,
        target: '_self',
      }),
      resourceIcon: '::open-in-new',
      appKey: 'test-party:appParty',
      resourceRoles: 'root',
      resourceSorting: 4,
    },
  ];
  return resources;
};
