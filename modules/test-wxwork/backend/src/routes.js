module.exports = app => {
  const routes = [
    // test
    {
      method: 'post',
      path: 'test/getMemberId',
      controller: 'test',
      middlewares: 'inWxwork',
      meta: {
        inWxwork: {
          providerName: 'wxwork',
          providerScene: null,
        },
      },
    },
    {
      method: 'post',
      path: 'test/sendAppMessage',
      controller: 'test',
      middlewares: 'inWxwork',
      meta: {
        inWxwork: {
          providerName: 'wxwork',
          providerScene: null,
        },
      },
    },
  ];
  return routes;
};
