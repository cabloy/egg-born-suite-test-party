module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const schemas = {};
  // party over
  schemas.partyOverBulk = {
    type: 'object',
    properties: {
      // Over Info
      __groupPartyOverInfo: {
        ebType: 'group-flatten',
        ebTitle: 'PartyOverInfo',
      },
      partySummary: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'PartySummary',
        ebParams: {
          // textarea: true,
        },
        notEmpty: true,
      },
    },
  };
  return schemas;
};
