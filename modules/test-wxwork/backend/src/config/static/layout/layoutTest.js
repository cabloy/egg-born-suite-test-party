module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    toolbar: {
      buttons: [
        { module: 'test-wxwork', name: 'buttonTest' },
        { module: 'a-layoutmobile', name: 'buttonHome' },
        { module: 'a-layoutmobile', name: 'buttonMine' },
      ],
    },
  };
  const layout = {
    atomName: 'Test Layout(Wechat Work)',
    atomStaticKey: 'layoutTest',
    atomRevision: 3,
    description: '',
    layoutTypeCode: 1,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};
