module.exports = [
  // test
  {
    method: 'post',
    path: 'test/getMemberId',
    controller: 'test',
    middlewares: 'inDingtalk',
    meta: {
      inDingtalk: [
        {
          providerName: 'dingtalk',
          providerScene: null,
        },
        {
          providerName: 'dingtalkadmin',
          providerScene: null,
        },
        {
          providerName: 'dingtalkmini',
          providerScene: null,
        },
      ],
    },
  },
  {
    method: 'post',
    path: 'test/sendAppMessage',
    controller: 'test',
    middlewares: 'inDingtalk',
    meta: {
      inDingtalk: [
        {
          providerName: 'dingtalk',
          providerScene: null,
        },
        {
          providerName: 'dingtalkadmin',
          providerScene: null,
        },
        {
          providerName: 'dingtalkmini',
          providerScene: null,
        },
      ],
    },
  },
];
