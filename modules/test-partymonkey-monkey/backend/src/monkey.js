module.exports = app => {
  // eslint-disable-next-line
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);

  function monkeyRoute(module, routePath, routeController) {
    const route = module.main.routes.find(item => item.path === routePath);
    if (route) {
      route.controller = routeController;
    }
  }

  function monkeyConfig(module, config) {
    config.monkeyed = true;
  }

  const monkey = {
    moduleLoading({ /* moduleSelf,*/ module }) {
      if (module.info.relativeName !== 'test-party') return;
      // route
      monkeyRoute(module, 'test/monkey/monkeyee/test', {
        module: moduleInfo.relativeName,
        name: 'monkeyer',
      });
    },
    moduleLoaded(/* { moduleSelf, module }*/) {
      // do nothing
    },
    configLoaded({ /* moduleSelf,*/ module, config }) {
      if (module.info.relativeName !== 'test-party') return;
      // config
      monkeyConfig(module, config);
    },
    metaLoaded(/* { moduleSelf, module, meta }*/) {
      // do nothing
    },
  };
  return monkey;
};
