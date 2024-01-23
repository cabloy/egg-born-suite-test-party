import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';
const assert = require('assert');

@Controller()
export class ControllerTestFeatTag extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async tag() {
    // atomClass
    const atomClass = {
      module: 'test-party',
      atomClassName: 'party',
    };

    // add
    const tagId = await this.ctx.bean.tag.add({
      atomClass,
      data: {
        // language: 'en-us', // neednot set language
        tagName: 'tagOne',
      },
    });
    assert(tagId > 0);

    // parseTags: 'tagOne,tagTwo,tagThree'
    const tagIds = await this.ctx.bean.tag.parseTags({
      atomClass,
      // language: 'en-us',// neednot set language
      tagName: 'tagOne,tagTwo,tagThree',
      force: true,
    });
    assert.equal(tagIds.length, 3);

    // ok
    this.ctx.success();
  }
}
