module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    layouts: {
      default: {
        blocks: {
          mineBody: {
            component: {
              module: 'test-party',
              name: 'appMineLayoutBlockDefaultMineBody',
            },
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'Party',
    atomStaticKey: 'layoutAppMineParty',
    atomRevision: 0,
    description: '',
    layoutTypeCode: 14,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};
