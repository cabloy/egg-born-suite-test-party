import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const languages = require('./data/autocomplete-languages.json');

@Controller()
export class ControllerKitchenSinkAutocomplete extends BeanBase {
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
}
