import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'testPartyExpense',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelPartyExpense' },
  },
})
export class ModelPartyExpense extends BeanModelBase {}
