module.exports = app => {
  const routes = [
    // test
    {
      method: 'post',
      path: 'test/getMemberId',
      controller: 'test',
      middlewares: 'inDingtalk',
      meta: {
        inDingtalk: {
          providerName: 'dingtalk',
          providerScene: null,
        },
      },
    },
    {
      method: 'post',
      path: 'test/sendAppMessage',
      controller: 'test',
      middlewares: 'inDingtalk',
      meta: {
        inDingtalk: {
          providerName: 'dingtalk',
          providerScene: null,
        },
      },
    },
  ];
  return routes;
};
