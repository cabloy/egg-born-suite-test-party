const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventWechatMessage = require('./bean/event.wechatMessage.js');
const eventWechatMessageMini = require('./bean/event.wechatMessageMini.js');

module.exports = {
  'event.loginInfo': {
    mode: 'ctx',
    bean: eventLoginInfo,
  },
  'event.wechatMessage': {
    mode: 'ctx',
    bean: eventWechatMessage,
  },
  'event.wechatMessageMini': {
    mode: 'ctx',
    bean: eventWechatMessageMini,
  },
};
