// const moduleInfo = module.info;

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
      default: '',
      notEmpty: true,
    },
  },
};
module.exports = schemas;
