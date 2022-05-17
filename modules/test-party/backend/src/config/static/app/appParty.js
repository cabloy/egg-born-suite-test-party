module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const info = {
    home: {
      mode: 'dashboard',
      dashboard: 'test-party:dashboardTest',
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
    atomRevision: 1,
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
