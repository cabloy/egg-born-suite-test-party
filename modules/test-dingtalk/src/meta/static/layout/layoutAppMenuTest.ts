const content = {
  layouts: {
    list: {
      blocks: {
        items: {
          component: {
            module: moduleInfo.relativeName,
            name: 'appTestMenuLayoutBlockListItems',
          },
        },
      },
    },
  },
};
const layout = {
  atomName: 'Test App Menu Layout(Dingtalk)',
  atomStaticKey: 'layoutAppMenuTest',
  atomRevision: 0,
  description: '',
  layoutTypeCode: 13,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
