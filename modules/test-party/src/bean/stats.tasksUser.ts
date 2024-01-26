import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsTasksUser extends BeanBase {
  async execute(context) {
    const { keys, user } = context;
    const fullName = keys.join('.');
    const valueOld = await this.ctx.bean.stats._get({
      module: moduleInfo.relativeName,
      fullName,
      user,
    });
    if (valueOld === undefined) return 1;
    return valueOld + 1;
  }
}
