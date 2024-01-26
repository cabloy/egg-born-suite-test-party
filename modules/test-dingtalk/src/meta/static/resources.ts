const resources = [
  // tabbar buttons
  {
    atomName: 'Test',
    description: 'Tabbar Button: Test(Dingtalk)',
    atomStaticKey: 'buttonTest',
    atomRevision: -1,
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
];
export default resources;
