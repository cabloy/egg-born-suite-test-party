const path = require('path');
const fse = require('fs-extra');

const __JSContent = `module.exports = ctx => {
  class Demo {
    async execute() {
      return 'hello world';
    }
  }
  return Demo;
};
`;

module.exports = app => {
  class DemoController extends app.Controller {
    async demo() {
      const jsFile = await this._prepareJSFile();
      const DemoFn = app.meta.util.requireDynamic(jsFile);
      const demo = new (DemoFn(this.ctx))();
      const result = await demo.execute();
      this.ctx.success(result);
    }

    async _prepareJSFile() {
      const jsFile = path.join(app.baseDir, 'demo.js');
      const exists = await fse.exists(jsFile);
      if (!exists) {
        await fse.outputFile(jsFile, __JSContent);
      }
      return jsFile;
    }
  }

  return DemoController;
};
