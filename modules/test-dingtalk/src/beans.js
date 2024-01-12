const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventDingtalkMessageGeneral = require('./bean/event.dingtalkMessageGeneral.js');

module.exports = {
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.dingtalkMessageGeneral': {
    bean: eventDingtalkMessageGeneral,
  },
};
