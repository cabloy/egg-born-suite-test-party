const content = {
  root: {
    id: 'e341b99ef3bc495db8a8c09e6ad6203e',
    widgets: [
      {
        id: 'a0031e5e2aef421f8434856512dec714',
        name: 'widgetSales',
        module: 'test-party',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '7aefb0431ef24996ba35b596b53372e7',
        group: true,
        widgets: [
          {
            id: 'fe96b7ede7f5480a9590e92184272455',
            name: 'widgetSalesLine',
            module: 'test-party',
            properties: {
              fruit: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'fruit',
                },
                type: 2,
              },
              title: {
                type: 1,
                value: '',
              },
              height: {
                type: 1,
                value: 'auto',
              },
              dataSource: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'dataSource',
                },
                type: 2,
              },
              widthLarge: {
                type: 1,
                value: 100,
              },
              widthSmall: {
                type: 1,
                value: 100,
              },
              widthMedium: {
                type: 1,
                value: 100,
              },
            },
          },
          {
            id: '9ee4b1234b4a477890ce094e8eb5e332',
            name: 'widgetSalesPie',
            module: 'test-party',
            properties: {
              title: {
                type: 1,
                value: '',
              },
              height: {
                type: 1,
                value: 'auto',
              },
              season: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'season',
                },
                type: 2,
              },
              dataSource: {
                bind: {
                  widgetId: 'a0031e5e2aef421f8434856512dec714',
                  propertyName: 'dataSource',
                },
                type: 2,
              },
              widthLarge: {
                type: 1,
                value: 100,
              },
              widthSmall: {
                type: 1,
                value: 100,
              },
              widthMedium: {
                type: 1,
                value: 100,
              },
            },
          },
        ],
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '64f7c356b78f45799e4b3072af73866e',
        name: 'widgetSnapshot',
        module: 'test-party',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          snapshots: {
            type: 2,
            binds: [
              {
                id: 'fb3eac5b678e488cb4da60a2bddb0f60',
                widgetId: 'fe96b7ede7f5480a9590e92184272455',
                propertyName: 'snapshot',
              },
              {
                id: '40b8e8ea3007418992f0489cba98129e',
                widgetId: '9ee4b1234b4a477890ce094e8eb5e332',
                propertyName: 'snapshot',
              },
            ],
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
      {
        id: '8a04bfa743fb42b2a65a104e018ab924',
        name: 'widgetAbout',
        module: 'a-dashboard',
        properties: {
          title: {
            type: 1,
            value: '',
          },
          height: {
            type: 1,
            value: 'auto',
          },
          widthLarge: {
            type: 1,
            value: 25,
          },
          widthSmall: {
            type: 1,
            value: 100,
          },
          widthMedium: {
            type: 1,
            value: 50,
          },
        },
      },
    ],
  },
};

// const moduleInfo = module.info;

const dashboard = {
  atomName: 'Dashboard(Test)',
  atomStaticKey: 'dashboardTest',
  atomRevision: 1,
  description: '',
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = dashboard;
