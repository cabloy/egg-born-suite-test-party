import { BeanBase, IMonkeyModule } from '@cabloy/core';
import { __ThisModule__ } from './resource/this.js';

function monkeyRoute(module, routePath, routeController) {
  const route = module.main.routes.find(item => item.path === routePath);
  if (route) {
    route.controller = routeController;
  }
}

function monkeyConfig(_module, config) {
  config.monkeyed = true;
}

export class Monkey extends BeanBase implements IMonkeyModule {
  async moduleLoading({ /* moduleSelf,*/ module }): Promise<void> {
    if (module.info.relativeName !== 'test-party') return;
    // route
    monkeyRoute(module, 'test/monkey/monkeyee/test', {
      module: __ThisModule__,
      name: 'monkeyer',
    });
  }
  async moduleLoaded(_options): Promise<void> {}
  async configLoaded({ /* moduleSelf,*/ module, config }): Promise<void> {
    if (module.info.relativeName !== 'test-party') return;
    // config
    monkeyConfig(module, config);
  }
  async metaLoaded(_options): Promise<void> {}
}
