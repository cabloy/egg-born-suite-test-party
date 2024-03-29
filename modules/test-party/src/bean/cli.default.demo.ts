import { Bean } from '@cabloy/core';
import { BeanCliBase } from 'cabloy-module-api-a-cli';

@Bean({ scene: 'cli.default' })
export class CliDefaultDemo extends BeanCliBase {
  async meta({ user }: any) {
    const meta = await super.meta({ user });
    return meta;
  }
  async execute({ user }: any) {
    // super
    await super.execute({ user });
    // chalk
    let text = this.helper.chalk.keyword('orange')('chalk test');
    await this.console.log({ text });
    // boxen
    text = this.helper.boxen({ text: 'boxen test' });
    await this.console.log({ text });
    // table
    const table = this.helper.newTable({
      head: ['Name', 'Sex'],
      colWidths: [20, 20],
    });
    table.push(['Tom', 'M']);
    table.push(['Jane', 'F']);
    await this.console.log({ text: 'table test' });
    await this.console.log({ text: table.toString() });
    //  level one
    await this._levelOne({ progressNo: 0 });
  }

  async _levelOne({ progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelOne')}: ${i + 1}`;
      await this.console.log({
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(200);
      // level two
      await this._levelTwo({ progressNo: progressNo + 1 });
    }
  }

  async _levelTwo({ progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelTwo')}: ${i + 1}`;
      await this.console.log({
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(200);
      // level two
      await this._levelThree({ progressNo: progressNo + 1 });
    }
  }

  async _levelThree({ progressNo }: any) {
    const total = 3;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelThree')}: ${i + 1}`;
      await this.console.log({
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(200);
    }
  }
}
