const moduleInfo = module.info;

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
];
module.exports = resources;
