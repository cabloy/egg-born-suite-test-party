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
      // Extra
      __groupExtra: {
        ebType: 'group-flatten',
        ebTitle: 'Extra',
      },
      atomCategoryId: {
        type: 'number',
        ebType: 'category',
        ebTitle: 'Category',
      },
      atomTags: {
        type: ['string', 'null'],
        ebType: 'tags',
        ebTitle: 'Tags',
      },
      partyOver: {
        ebType: 'toggle',
        ebTitle: 'PartyOver',
        ebDisplay: {
          // expression: 'status===0',
          // dependencies: ['status'],
          host: {
            stage: 'formal',
            // mode: 'view',
          },
        },
        ebReadOnly: true,
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
