const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventWxworkMessage = require('./bean/event.wxworkMessage.js');

module.exports = {
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.wxworkMessage': {
    bean: eventWxworkMessage,
  },
};
