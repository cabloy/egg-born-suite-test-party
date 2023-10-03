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
          transaction: true, // default is true
          dialog: {
            confirm: true, // default is true
            confirmText: null,
            toast: true, // default is true
            toastText: null,
          },
          actionAfter: {
            sameAs: 'write',
          },
        },
      },
      partyOverBulk: {
        code: 201,
        title: 'PartyOver',
        // actionModule: moduleInfo.relativeName,
        actionModule: 'a-base',
        actionComponent: 'actionBulk',
        icon: { f7: ':outline:check-circle-outline' },
        bulk: true,
        select: true,
        stage: 'formal',
        params: {
          transaction: true, // default is true
          dialog: {
            confirm: true, // default is true
            confirmText: null,
            toast: true, // default is true
            toastTextDoneAll: null,
            toastTextDoneSome: null,
          },
          actionAfter: {
            sameAs: 'create',
          },
        },
      },
    },
    validator: 'party',
    search: {
      validator: 'partySearch',
    },
  };
  return party;
};
