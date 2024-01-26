const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventDingtalkMessageGeneral = require('./bean/event.dingtalkMessageGeneral.js');

export default {
  'event.loginInfo': {
    bean: eventLoginInfo,
  },
  'event.dingtalkMessageGeneral': {
    bean: eventDingtalkMessageGeneral,
  },
};
