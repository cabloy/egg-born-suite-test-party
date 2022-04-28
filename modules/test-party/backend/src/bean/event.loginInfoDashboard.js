const require3 = require('require3');
const extend = require3('extend2');

module.exports = ctx => {
  // const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class EventBean {
    async execute(context, next) {
      const data = context.data;
      const info = data.info;
      info.config = extend(true, info.config, {
        modules: {
          'a-dashboard': {
            dashboard: {
              presets: {
                anonymous: {
                  default: 'a-dashboard:dashboardDefault',
                  home: 'test-party:dashboardTest',
                },
                authenticated: {
                  default: 'test-party:dashboardTest',
                  home: 'test-party:homeTest',
                },
              },
            },
          },
        },
      });
      // next
      await next();
    }
  }

  return EventBean;
};
