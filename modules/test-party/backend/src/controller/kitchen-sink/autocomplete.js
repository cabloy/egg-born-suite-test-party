const languages = require('./data/autocomplete-languages.json');

module.exports = class AutocompleteController {
  async languages() {
    const query = this.ctx.params.query;
    let data;
    if (!query) {
      data = [];
    } else {
      data = languages.filter(item => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
    this.ctx.success(data);
  }
};
