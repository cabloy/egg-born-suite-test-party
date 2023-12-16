const content = {
  root: {
    id: 'e341b99ef3bc495db8a8c09e6ad6203f',
    widgets: [
      {
        atomStaticKey: 'test-note:widgetNote',
        id: '878d9687921641de880b130fa0ff5fd0',
        properties: {
          demoKey: {
            type: 1,
            value: 'demo-1',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        atomStaticKey: 'test-note:widgetNote',
        id: '688725d1c2a446fea402580a5af072da',
        properties: {
          demoKey: {
            type: 1,
            value: 'demo-2',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        atomStaticKey: 'test-party:widgetSimpleChat',
        id: '650acfa718f645098bf0516628d678f0',
        properties: {
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
      {
        id: '8a04bfa743fb42b2a65a104e018ab924',
        module: 'a-dashboard',
        name: 'widgetAbout',
        properties: {
          height: {
            type: 1,
            value: 'auto',
          },
          title: {
            type: 1,
            value: '',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
        },
      },
    ],
  },
};

// const moduleInfo = module.info;
module.exports = app => {
  const dashboard = {
    atomName: 'Home(Test)',
    atomStaticKey: 'homeTest',
    atomRevision: 11,
    description: '',
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return dashboard;
};
