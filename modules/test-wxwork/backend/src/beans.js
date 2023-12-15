const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventWxworkMessage = require('./bean/event.wxworkMessage.js');

module.exports = {
  'event.loginInfo': {
    mode: 'ctx',
    bean: eventLoginInfo,
  },
  'event.wxworkMessage': {
    mode: 'ctx',
    bean: eventWxworkMessage,
  },
};
