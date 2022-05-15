module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const info = {
    home: {
      mode: 'page',
      page: '/a/basefront/atom/list?module=test-party&atomClassName=party',
    },
    mine: {
      layout: 'test-party:layoutAppMineParty',
    },
  };
  const content = {
    presets: {
      anonymous: {
        mobile: info,
        pc: info,
      },
      authenticated: {
        mobile: info,
        pc: info,
      },
    },
  };
  const _app = {
    atomName: 'Party',
    atomStaticKey: 'appParty',
    atomRevision: 0,
    atomCategoryId: 'Demonstration',
    description: '',
    appIcon: ':business:party',
    appIsolate: false,
    content: JSON.stringify(content),
    resourceRoles: 'authenticated',
    appSorting: 0,
  };
  return _app;
};
