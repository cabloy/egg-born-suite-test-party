module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    //
    {
      atomName: 'Create Party',
      atomStaticKey: 'createParty',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'create',
      }),
      resourceIcon: '::add',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,family',
    },
    {
      atomName: 'Party List',
      atomStaticKey: 'listParty',
      atomRevision: 3,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'read',
      }),
      resourceIcon: ':outline:data-list-outline',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,authenticated',
    },
    //
    {
      atomName: 'Party',
      atomStaticKey: 'openIsolateAppParty',
      atomRevision: 9,
      atomCategoryId: 'a-base:menu.OpenIsolateApp',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: 'a-app',
        actionComponent: 'actionTools',
        name: 'openApp',
        appKey: 'test-party:appParty',
        appLanguage: null,
        appIsolate: true,
        external: true,
        target: '_blank',
      }),
      resourceIcon: '::open-in-new',
      appKey: 'test-party:appParty',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
    // app: appComponents
    {
      atomName: 'About',
      atomStaticKey: 'appComponentsAbout',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.General',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionPath: '/a/basefront/base/about',
      }),
      resourceIcon: '::information',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 1,
    },
    {
      atomName: 'Guide',
      atomStaticKey: 'appComponentsGuide',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.General',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/guide',
      }),
      resourceIcon: '::book',
      appKey: 'test-party:appComponents',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
  ];
  return resources;
};
