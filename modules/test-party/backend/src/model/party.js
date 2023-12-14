module.exports = class Party extends module.meta.class.Model {
  constructor() {
    super({ table: 'testParty', options: { disableDeleted: false } });
  }
};
