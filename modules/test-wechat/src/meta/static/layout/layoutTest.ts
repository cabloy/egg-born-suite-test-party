const content = {
  toolbar: {
    buttons: [
      { module: 'test-wechat', name: 'buttonTest' },
      { module: 'a-layoutmobile', name: 'buttonAppHome' },
      { module: 'a-layoutmobile', name: 'buttonAppMine' },
    ],
  },
};
const layout = {
  atomName: 'Test Layout(Wechat)',
  atomStaticKey: 'layoutTest',
  atomRevision: 5,
  description: '',
  layoutTypeCode: 1,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
