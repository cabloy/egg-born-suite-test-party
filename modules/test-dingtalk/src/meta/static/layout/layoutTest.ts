// const moduleInfo = module.info;

const content = {
  toolbar: {
    buttons: [
      { module: 'test-dingtalk', name: 'buttonTest' },
      { module: 'a-layoutmobile', name: 'buttonAppHome' },
      { module: 'a-layoutmobile', name: 'buttonAppMine' },
    ],
  },
};
const layout = {
  atomName: 'Test Layout(Dingtalk)',
  atomStaticKey: 'layoutTest',
  atomRevision: 5,
  description: '',
  layoutTypeCode: 1,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
