// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};

  if (appInfo.env === 'unittest') {
    // startups
    config.startups = {
      startupAll: {
        bean: 'startupAll',
      },
      startupInstance: {
        bean: 'startupInstance',
        instance: true,
      },
    };
    // queues
    config.queues = {
      queueTest: {
        bean: 'test',
      },
    };
    // broadcasts
    config.broadcasts = {
      broadcastTest: {
        bean: 'test',
      },
    };
    // monkey
    config.monkeyed = false;
  }

  // config
  config.message = 'Hello World';

  // middlewares
  config.middlewares = {
    testInterception: {
      bean: 'testInterception',
      global: false,
      dependencies: 'instance',
    },
    testRestructuring: {
      bean: 'testRestructuring',
      global: false,
      dependencies: 'instance',
    },
  };

  // schedules
  config.schedules = {
    test: {
      bean: 'test',
      repeat: {
        every: 3000,
      },
      disable: true,
    },
  };

  // summer
  config.summer = {
    caches: {
      test: {
        bean: 'test',
        type: 'all', // mem/redis/all
        mem: {
          max: 5,
          ttl: 5 * 1000,
        },
        redis: {
          ttl: 5 * 1000,
        },
      },
    },
  };

  // settings
  config.settings = {
    instance: {
      groupInfo: {
        slogan: '',
      },
    },
    user: {
      groupInfo: {
        username: 'zhennann',
      },
      groupExtra: {
        panelExtra: {
          groupInfo: {
            mobile: '123',
            sex: 1,
            language: 'en-us',
          },
        },
      },
    },
  };

  // captcha scenes
  const _captchaSMS = {
    module: 'a-authsms',
    name: 'captcha',
  };
  config.captcha = {
    scenes: {
      formMobileVerifyTest: _captchaSMS,
      formCaptchaTest: null, // means using default
      // formCaptchaTest: {
      //   module: 'a-captchasimple',
      //   name: 'captcha',
      // },
    },
  };

  // cms site
  config.cms = {};
  config.cms.sites = {};
  config.cms.sites.party = {
    base: {
      title: 'Party',
      subTitle: 'Test',
      description: '',
      keywords: '',
    },
    host: {
      url: 'http://example.com',
      rootPath: '',
    },
    language: false,
    themes: {
      default: 'test-party',
    },
    edit: {
      mode: 0, // custom
    },
    env: {
      format: {
        date: 'YYYY-MM-DD',
        time: 'HH:mm:ss',
      },
      article2: {
        recentNum: 5,
      },
      comment: {
        order: 'asc',
        recentNum: 5,
      },
      brother: {
        order: 'desc',
      },
      loadMore: {
        loadOnScroll: false,
      },
    },
  };

  return config;
};
