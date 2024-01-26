const resources = [
  {
    atomName: 'Fruit Sales',
    atomStaticKey: 'widgetSales',
    atomRevision: 0,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetSales',
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'Fruit Sales(Line Chart)',
    atomStaticKey: 'widgetSalesLine',
    atomRevision: 0,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetSalesLine',
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'Fruit Sales(Pie Chart)',
    atomStaticKey: 'widgetSalesPie',
    atomRevision: 0,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetSalesPie',
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'Snapshots',
    atomStaticKey: 'widgetSnapshot',
    atomRevision: 0,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetSnapshot',
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'About',
    atomStaticKey: 'widgetAbout',
    atomRevision: 0,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetAbout',
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'Simple Chat',
    atomStaticKey: 'widgetSimpleChat',
    atomRevision: 20,
    atomCategoryId: 'a-dashboard:widget.Demonstration',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: moduleInfo.relativeName,
      component: 'widgetSimpleChat',
    }),
    resourceRoles: 'root',
  },
];
export default resources;
