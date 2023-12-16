// const moduleInfo = module.info;
module.exports = app => {
  const resources = [
    // tabbar buttons
    {
      atomName: 'Test',
      description: 'Tabbar Button: Test(Wechat Work)',
      atomStaticKey: 'buttonTest',
      atomRevision: -1,
      atomCategoryId: 'a-layoutmobile:button.General',
      resourceType: 'a-layoutmobile:button',
      resourceConfig: JSON.stringify({
        module: 'a-layoutmobile',
        component: 'buttonLink',
        icon: { f7: '::group-work' },
        url: '/test/wxwork/test/index',
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};
