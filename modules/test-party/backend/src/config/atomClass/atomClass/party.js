module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const party = {
    info: {
      bean: 'party',
      title: 'Party',
      tableName: 'testParty',
      tableNameModes: {},
      language: false,
      category: true,
      tag: true,
      cms: true,
      fields: {
        dicts: {
          partyTypeCode: {
            dictKey: 'test-party:dictPartyType',
            // separator: '/',
          },
          partyCountry: {
            dictKey: 'a-dictbooster:countries',
          },
          partyCity: {
            translate: false,
          },
        },
      },
      layout: {
        config: {
          atomList: 'layoutAtomListParty',
          atomItem: 'layoutAtomItemParty',
        },
      },
    },
    actions: {
      partyOver: {
        code: 101,
        title: 'PartyOver',
        // actionModule: moduleInfo.relativeName,
        actionModule: 'a-base',
        actionComponent: 'action',
        icon: { f7: ':outline:check-circle-outline' },
        enableOnOpened: true,
        directShowOnList: true,
        directShowOnItem: true,
        stage: 'formal',
        params: {
          transaction: true, // default
          dialog: {
            confirm: true,
            confirmText: null,
            toast: true,
            toastText: null,
          },
        },
      },
      partyOverBulk: {
        code: 201,
        title: 'PartyOver',
        actionModule: moduleInfo.relativeName,
        actionComponent: 'action',
        icon: { f7: ':outline:check-circle-outline' },
        bulk: true,
        select: true,
        stage: 'formal',
      },
    },
    validator: 'party',
    search: {
      validator: 'partySearch',
    },
  };
  return party;
};
