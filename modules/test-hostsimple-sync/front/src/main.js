let Vue;

import './assets/css/module.less';

// install
function install(_Vue, cb, { moduleInfo }) {
  if (Vue) return console.error('already installed.');

  Vue = _Vue;

  return cb({
    routes: require('./routes.js').default,
    store: require('./store.js').default(Vue),
    config: require('./config/config.js').default,
    locales: require('./config/locales.js').default,
    components: require('./components.js').default,
    onLoaded: () => {
      __onLoaded({ moduleInfo });
    },
  });
}

async function __onLoaded({ moduleInfo }) {
  const config = Vue.prototype.$meta.config.modules[moduleInfo.relativeName];
  if (!config.enableTest) return;
  // in localhost
  const hostname = window.location.hostname;
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') return;
  // register
  await __register({ moduleInfo });
}

async function __register({ moduleInfo }) {
  const hostName = 'test-simple';
  const capabilityName = 'shareLink';
  // register host
  await Vue.prototype.$meta.util.performAction({
    action: {
      actionModule: 'a-host',
      actionComponent: 'hosts',
      name: 'register',
    },
    item: {
      name: hostName,
      action: {
        module: moduleInfo.relativeName,
        component: 'capabilities',
      },
    },
  });
  // register capability
  await Vue.prototype.$meta.util.performAction({
    action: {
      actionModule: 'a-host',
      actionComponent: 'capabilities',
      name: 'register',
    },
    item: {
      name: capabilityName,
      host: hostName,
    },
  });
}

// export
export default {
  install,
};
