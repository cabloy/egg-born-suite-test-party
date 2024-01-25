const resources = [
  {
    atomName: 'Kitchen-sink',
    atomStaticKey: 'mineKitchenSink',
    atomRevision: 1,
    atomCategoryId: 'a-base:mine.Tools',
    resourceType: 'a-base:mine',
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
