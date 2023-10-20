module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const schemas = {};
  // party
  schemas.party = {
    type: 'object',
    properties: {
      // Basic Info
      __groupBasicInfo: {
        ebType: 'group-flatten',
        ebTitle: 'Basic Info',
        ebGroupWhole: true,
      },
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Party Name',
        notEmpty: true,
      },
      personCount: {
        type: 'integer',
        ebType: 'text',
        ebTitle: 'Person Count',
        minimum: 1,
        notEmpty: true,
      },
      partyTypeCode: {
        type: 'number',
        ebType: 'dict',
        ebTitle: 'Party Type',
        ebParams: {
          dictKey: 'test-party:dictPartyType',
          mode: 'tree',
        },
        notEmpty: true,
      },
      partyTime: {
        type: ['object', 'null'],
        ebType: 'datePicker',
        ebTitle: 'Party Time',
        ebParams: {
          timePicker: true,
          dateFormat: 'YYYY-MM-DD HH:mm:00',
          header: false,
          toolbar: true,
        },
        notEmpty: true,
        'x-date': true,
      },
      partyCountry: {
        type: 'string',
        ebType: 'dict',
        ebTitle: 'Party Country',
        ebParams: {
          dictKey: 'a-dictbooster:countries',
          mode: 'select',
        },
        ebOptionsBlankAuto: true,
      },
      partyCity: {
        type: 'string',
        ebType: 'component',
        ebTitle: 'Party City',
        ebRender: {
          module: moduleInfo.relativeName,
          name: 'renderPartyCity',
        },
        ebParams: {
          separator: '/',
          leafOnly: true,
        },
      },
      // Over Info
      __groupPartyOverInfo: {
        ebType: 'group-flatten',
        ebTitle: 'PartyOverInfo',
        ebDisplay: {
          // expression: 'partyOver===1',
          // dependencies: ['partyOver'],
          host: {
            stage: 'formal',
            // mode: 'view',
          },
        },
      },
      partyOver: {
        ebType: 'toggle',
        ebTitle: 'PartyOver',
        ebDisplay: {
          host: {
            stage: 'formal',
          },
        },
        ebReadOnly: true,
      },
      partySummary: {
        type: 'string',
        ebCopy: false,
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
        ebReadOnly: true,
      },
      // Expense Info
      __groupPartyExpenseInfo: {
        ebType: 'group-flatten',
        ebTitle: 'PartyExpenseInfo',
      },
      partyExpense: {
        type: 'number',
        ebCopy: false,
        ebType: 'text',
        ebTitle: 'PartyExpense',
        ebParams: {
          currency: true,
        },
      },
      // Details
      __groupPartyExpenseDetailsInfo: {
        ebType: 'group-flatten',
        ebTitle: 'PartyExpenseDetails',
        ebGroupWhole: true,
        ebParams: {
          titleHidden: true,
        },
      },
      partyExpenseDetails: {
        ebType: 'details',
        ebTitle: 'PartyExpenseDetails',
        ebParams: {
          atomClass: {
            module: 'test-party',
            atomClassName: 'partyExpense',
          },
        },
      },
    },
  };
  // party search
  schemas.partySearch = {
    type: 'object',
    properties: {
      partyTypeCode: {
        type: 'number',
        ebType: 'dict',
        ebTitle: 'Party Type',
        ebParams: {
          className: 'col-100 medium-100 large-100',
          dictKey: 'test-party:dictPartyType',
          mode: 'tree',
        },
        ebOptionsBlankAuto: true,
      },
      partyTime: {
        type: 'string',
        ebType: 'dateRange',
        ebTitle: 'Party Time',
        ebParams: {
          dateFormat: 'YYYY-MM-DD',
          header: false,
          toolbar: true,
        },
        ebSearch: {
          combine: {
            actionModule: 'a-basefront',
            actionComponent: 'combineSearch',
            name: 'dateRange',
          },
        },
      },
      partyCountry: {
        type: 'string',
        ebType: 'dict',
        ebTitle: 'Party Country',
        ebParams: {
          dictKey: 'a-dictbooster:countries',
          mode: 'select',
        },
        ebOptionsBlankAuto: true,
      },
      partyCity: {
        type: 'string',
        ebType: 'component',
        ebTitle: 'Party City',
        ebRender: {
          module: moduleInfo.relativeName,
          name: 'renderPartyCity',
        },
        ebParams: {
          separator: '/',
          leafOnly: false,
        },
        ebSearch: {
          operators: 'likeRight',
        },
      },
    },
  };
  return schemas;
};
