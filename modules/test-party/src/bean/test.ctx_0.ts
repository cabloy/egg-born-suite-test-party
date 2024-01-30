import { BeanBase } from '@cabloy/core';

export class TestCtx0 extends BeanBase {
  _name: string;

  __init__(moduleName) {
    this._name = moduleName || this.ctx.module.info.relativeName;
  }

  __get__(prop) {
    if (prop === 'magicSelf') {
      return this['magic:self'];
    }
  }

  __set__(prop, value) {
    if (prop === 'magicSelf') {
      this['magic:self'] = value;
    }
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  actionSync({ a, b }: any) {
    return a + b;
  }

  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }

  async actionAsync2({ a, b }: any) {
    const name = this.name;
    const value = await this.actionAsync({ a, b });
    return `${name}:${value}`;
  }
}
