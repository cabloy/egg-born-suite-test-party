import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'middleware' })
export class MiddlewareRestructuring extends BeanBase {
  async execute(options, next) {
    const { a, b } = this.ctx.request.body;
    this.ctx.request.body.a = parseInt(a);
    this.ctx.request.body.b = parseInt(b);
    // next
    await next();
  }
}
