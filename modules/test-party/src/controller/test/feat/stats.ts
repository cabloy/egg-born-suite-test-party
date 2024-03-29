import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatStats extends BeanBase<ScopeModule> {
  async stats() {
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    const user = { id: userIds.Tom };

    // old
    let value = await this.ctx.bean.stats.get({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });
    assert.equal(value, undefined);

    // notify
    await this.ctx.bean.stats.notifyAsync({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });

    // new
    value = await this.ctx.bean.stats.get({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });
    assert.equal(value, 1);

    // instance
    value = await this.ctx.bean.stats.get({
      name: 'tasksInstance',
      user,
    });
    assert.equal(value, 1);

    // done
    this.ctx.success();
  }

  async plus() {
    this.ctx.bean.stats.notify({
      name: 'tasksUser',
      nameSub: 'department.project',
    });
    this.ctx.success();
  }
}
