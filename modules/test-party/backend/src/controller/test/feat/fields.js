const require3 = require('require3');
const assert = require3('assert');

const __testData_allowAllFieldsRead = {
  mode: 'allowAllFieldsRead',
};

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class FieldsController extends app.Controller {
    async parseSchema() {
      const moduleTestFlow = app.meta.modules['test-flow'];
      if (!moduleTestFlow) {
        // do nothing
        this.ctx.success();
        return;
      }
      // atomClass
      const atomClass = { module: 'test-flow', atomClassName: 'purchaseOrder' };
      // mode: allowAllFieldsRead
      const schema = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowAllFieldsRead,
      });

      // ok
      this.ctx.success();
    }
  }
  return FieldsController;
};
