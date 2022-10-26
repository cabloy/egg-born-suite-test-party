module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // function
    {
      atomName: 'Cli Demo',
      atomStaticKey: 'cliDefaultDemo',
      atomRevision: 1,
      atomCategoryId: 'a-base:function.Cli',
      resourceType: 'a-base:function',
      resourceConfig: null,
      resourceRoles: 'template.system,RoleScopeCliDevelopment',
    },
    // menu
    {
      atomName: 'Create Party',
      atomStaticKey: 'createParty',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'create',
      }),
      resourceIcon: '::add',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,family',
    },
    {
      atomName: 'Party List',
      atomStaticKey: 'listParty',
      atomRevision: 3,
      atomCategoryId: 'a-base:menu.Party',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'party',
        atomAction: 'read',
      }),
      resourceIcon: ':outline:data-list-outline',
      appKey: 'test-party:appParty',
      resourceRoles: 'template.system,authenticated',
    },
    {
      atomName: 'Kitchen-sink',
      atomStaticKey: 'kitchenSink',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.Tools',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index',
      }),
      resourceIcon: ':business:kitchen-set',
      appKey: 'test-party:appParty',
      resourceRoles: 'root,RoleScopeCliDevelopment',
    },
    {
      atomName: 'Kitchen-sink',
      atomStaticKey: 'mineKitchenSink',
      atomRevision: 1,
      atomCategoryId: 'a-base:mine.Tools',
      resourceType: 'a-base:mine',
      resourceConfig: JSON.stringify({
        actionModule: moduleInfo.relativeName,
        actionPath: 'kitchen-sink/index',
      }),
      resourceIcon: ':business:kitchen-set',
      appKey: 'test-party:appParty',
      resourceRoles: 'root,RoleScopeCliDevelopment',
      resourceSorting: 1,
    },
    {
      atomName: 'Party',
      atomStaticKey: 'openIsolateAppParty',
      atomRevision: 9,
      atomCategoryId: 'a-base:menu.OpenIsolateApp',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        actionModule: 'a-app',
        actionComponent: 'actionTools',
        name: 'openApp',
        appKey: 'test-party:appParty',
        appLanguage: null,
        appIsolate: true,
        external: true,
        target: '_blank',
      }),
      resourceIcon: '::open-in-new',
      appKey: 'test-party:appParty',
      resourceRoles: 'root',
      resourceSorting: 2,
    },
    // dashboard widget
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
      atomName: 'Simple Chat',
      atomStaticKey: 'widgetSimpleChat',
      atomRevision: -1,
      atomCategoryId: 'a-dashboard:widget.Demonstration',
      resourceType: 'a-dashboard:widget',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        component: 'widgetSimpleChat',
      }),
      resourceRoles: 'root',
    },
    // markdown block
    {
      atomName: 'Article Comment Count',
      atomStaticKey: 'blockArticleCommentCount',
      atomRevision: 0,
      atomCategoryId: 'a-markdown:block.Demonstration',
      resourceType: 'a-markdown:block',
      resourceConfig: JSON.stringify({
        default: {
          interval: 1000,
        },
        validator: {
          module: moduleInfo.relativeName,
          validator: 'blockArticleCommentCount',
        },
      }),
      resourceRoles: 'root',
    },
  ];
  return resources;
};
