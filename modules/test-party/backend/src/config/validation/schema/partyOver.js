module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const schemas = {};
  // party over
  schemas.partyOver = {
    type: 'object',
    properties: {
      partyExpense: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'PartyExpense',
        ebDisplay: {
          host: {
            stage: 'formal',
          },
        },
        ebParams: {
          currency: true,
        },
        // ebReadOnly: true,
      },
      partySummary: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'PartySummary',
        ebDisplay: {
          host: {
            stage: 'formal',
          },
        },
        ebParams: {
          textarea: true,
        },
        // ebReadOnly: true,
      },
    },
  };
  return schemas;
};
