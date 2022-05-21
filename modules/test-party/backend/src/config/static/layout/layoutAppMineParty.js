module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    layouts: {
      list: {
        // blocks: {
        //   mineBody: {
        //     component: {
        //       module: 'test-party',
        //       name: 'appMineLayoutBlockListMineBody',
        //     },
        //   },
        // },
      },
    },
  };
  const layout = {
    atomName: 'Party',
    atomStaticKey: 'layoutAppMineParty',
    atomRevision: -1,
    description: '',
    layoutTypeCode: 14,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};
