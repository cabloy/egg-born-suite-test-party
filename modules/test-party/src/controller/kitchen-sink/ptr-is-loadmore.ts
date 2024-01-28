import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../../resource/this.js';
const gTestListMax = 89;

@Controller()
export class ControllerKitchenSinkPtrIsLoadmore extends BeanBase<ScopeModule> {
  async list() {
    // page
    let page = this.ctx.request.body.page;
    // adjust page
    page = this.ctx.bean.util.page(page, false);
    // items
    const items: any[] = [];
    for (let i = 0; i < page.size; i++) {
      const itemId = page.index + i + 1;
      if (itemId > gTestListMax) break;
      items.push({
        id: itemId,
        title: `${this.ctx.text('Item')} - ${itemId}`,
      });
    }
    // ok
    this.ctx.successMore(items, page.index, page.size);
  }
}
