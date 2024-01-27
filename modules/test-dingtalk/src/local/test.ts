import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalTest extends BeanBase {
  async getMemberId({ user }: any) {
    const modelMember = this.ctx.model.module('a-dingtalk').member;
    const member = await modelMember.get({ userId: user.id });
    return {
      memberId: member.memberId,
    };
  }

  async sendAppMessage({ message, user }: any) {
    const msg = {
      msgtype: 'text',
      text: {
        content: message.text,
      },
    };
    const content = {
      userIds: [user.id],
      data: { msg },
    };
    await this.ctx.bean.io.pushDirect({
      content,
      channel: { module: 'a-dingtalk', name: 'app' },
    });
  }
}
