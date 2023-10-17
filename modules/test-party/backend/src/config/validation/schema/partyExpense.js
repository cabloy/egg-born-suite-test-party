module.exports = app => {
  const schemas = {};
  // partyExpense
  schemas.partyExpense = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Name',
        notEmpty: true,
      },
      description: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Description',
      },
    },
  };
  return schemas;
};
