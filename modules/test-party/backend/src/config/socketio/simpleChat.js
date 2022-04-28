module.exports = app => {
  const simpleChat = {
    info: {
      bean: 'simpleChat',
      title: 'Simple Chat',
      persistence: true,
      push: {
        channels: false,
      },
    },
  };
  return simpleChat;
};
