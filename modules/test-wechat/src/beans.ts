import eventLoginInfo from './bean/event.loginInfo.js';
import eventWechatMessage from './bean/event.wechatMessage.js';
import eventWechatMessageMini from './bean/event.wechatMessageMini.js';

export default {
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.wechatMessage': {
    bean: eventWechatMessage,
  },
  'event.wechatMessageMini': {
    bean: eventWechatMessageMini,
  },
};
