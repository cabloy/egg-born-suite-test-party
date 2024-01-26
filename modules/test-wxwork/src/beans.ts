const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventWxworkMessage = require('./bean/event.wxworkMessage.js');

export default {
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.wxworkMessage': {
    bean: eventWxworkMessage,
  },
};
