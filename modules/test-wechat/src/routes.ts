import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // test
  {
    method: 'post',
    path: 'test/getOpenid',
    controller: 'test',
    middlewares: 'inWechat',
    meta: {
      inWechat: {
        providerName: 'wechat',
        providerScene: null,
      },
    },
  },
  {
    method: 'post',
    path: 'test/getOpenidMini',
    controller: 'test',
    middlewares: 'inWechat',
    meta: {
      inWechat: {
        providerName: 'wechatmini',
        providerScene: null,
      },
    },
  },
];
