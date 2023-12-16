// const moduleInfo = module.info;

const info = {};
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
  atomName: 'UIComponents',
  atomStaticKey: 'appComponents',
  atomRevision: 0,
  atomCategoryId: 'Demonstration',
  description: '',
  appIcon: ':business:kitchen-set',
  appIsolate: false,
  content: JSON.stringify(content),
  resourceRoles: 'root',
  appSorting: 0,
};
module.exports = _app;
