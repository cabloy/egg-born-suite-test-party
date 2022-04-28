module.exports = app => {
  const schemas = {};
  // blockArticleCommentCount
  schemas.blockArticleCommentCount = {
    type: 'object',
    properties: {
      interval: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'IntervalMS',
        notEmpty: true,
      },
    },
  };
  return schemas;
};
