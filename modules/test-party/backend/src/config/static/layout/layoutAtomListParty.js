module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    info: {
      orders: [
        { name: 'partyTypeCode', title: 'Party Type' },
        { name: 'personCount', title: 'Person Count', by: 'asc' },
      ],
    },
    layouts: {
      list: {
        blocks: {
          // title: false,
        },
      },
      table: {
        blocks: {
          items: {
            columns: [
              {
                dataIndex: 'atomName',
                title: 'Atom Name',
                align: 'left',
                component: {
                  module: 'a-baserender',
                  name: 'renderTableCellAtomName',
                },
              },
              {
                dataIndex: 'partyTypeCode',
                title: 'Party Type',
                align: 'left',
                component: {
                  module: 'a-baserender',
                  name: 'renderTableCellDict',
                },
              },
              {
                dataIndex: 'partyTime',
                title: 'Party Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: '_partyCityTitleLocale',
                title: 'Party City',
                align: 'left',
              },
              {
                dataIndex: 'personCount',
                title: 'Person Count',
                align: 'left',
              },
              {
                dataIndex: 'userIdCreated',
                title: 'Creator',
                align: 'left',
                component: {
                  module: 'a-baserender',
                  name: 'renderTableCellUserName',
                },
              },
              {
                dataIndex: 'atomCreatedAt',
                title: 'Created Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: 'atomUpdatedAt',
                title: 'Modification Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'Party',
    atomStaticKey: 'layoutAtomListParty',
    atomRevision: 4,
    description: '',
    layoutTypeCode: 3,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};
