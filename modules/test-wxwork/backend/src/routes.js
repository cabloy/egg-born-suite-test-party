module.exports = [
  // test
  {
    method: 'post',
    path: 'test/getMemberId',
    controller: 'test',
    middlewares: 'inWxwork',
    meta: {
      inWxwork: [
        {
          providerName: 'wxwork',
          providerScene: null,
        },
        {
          providerName: 'wxworkmini',
          providerScene: null,
        },
      ],
    },
  },
  {
    method: 'post',
    path: 'test/sendAppMessage',
    controller: 'test',
    middlewares: 'inWxwork',
    meta: {
      inWxwork: [
        {
          providerName: 'wxwork',
          providerScene: null,
        },
        {
          providerName: 'wxworkmini',
          providerScene: null,
        },
      ],
    },
  },
];
