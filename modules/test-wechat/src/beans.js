const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventWechatMessage = require('./bean/event.wechatMessage.js');
const eventWechatMessageMini = require('./bean/event.wechatMessageMini.js');

module.exports = {
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
