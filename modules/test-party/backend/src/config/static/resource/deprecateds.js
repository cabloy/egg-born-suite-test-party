module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // menu
    {
      atomName: 'Kitchen-sink',
      atomStaticKey: 'kitchenSink',
      atomRevision: -1,
      atomCategoryId: 'a-base:menu.Tools',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index',
      }),
      resourceIcon: ':business:kitchen-set',
      appKey: 'test-party:appParty',
      resourceRoles: 'root,RoleScopeCliDevelopment',
      resourceSorting: 1,
    },
    // dashboard widget
    {
      atomName: 'Simple Chat',
      atomStaticKey: 'widgetSimpleChat',
      atomRevision: -1,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSimpleChat',
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};
