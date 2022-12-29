module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
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
