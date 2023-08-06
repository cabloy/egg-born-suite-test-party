const require3 = require('require3');
const assert = require3('assert');

const __testData_allowAllFieldsRead = {
  mode: 'allowAllFieldsRead',
};
const __testData_allowAllFieldsReadWrite = {
  mode: 'allowAllFieldsReadWrite',
};
const __testData_allowSpecificFields_1 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: true },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: false }],
};
const __testData_allowSpecificFields_2 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: false },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: true }, 'details'],
};
const __testData_allowSpecificFields_3 = {
  mode: 'allowSpecificFields',
  basic: { read: false, write: false },
  fields: [
    'atomName',
    { name: 'detailsAmount', read: true, write: true },
    { name: 'details', read: true, write: false },
  ],
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
      await this._parseSchema_mode_allowAllFieldsRead({ atomClass });
      // mode: allowAllFieldsReadWrite
      await this._parseSchema_mode_allowAllFieldsReadWrite({ atomClass });
      // mode: allowSpecificFields_1
      await this._parseSchema_mode_allowSpecificFields_1({ atomClass });
      // mode: allowSpecificFields_2
      await this._parseSchema_mode_allowSpecificFields_2({ atomClass });
      // mode: allowSpecificFields_3
      await this._parseSchema_mode_allowSpecificFields_3({ atomClass });
      // ok
      this.ctx.success();
    }

    // mode: allowAllFieldsRead
    async _parseSchema_mode_allowAllFieldsRead({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowAllFieldsRead,
      });
      assert.equal(schemaBase.schema.properties.atomName.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, true);
    }

    // mode: allowAllFieldsReadWrite
    async _parseSchema_mode_allowAllFieldsReadWrite({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowAllFieldsReadWrite,
      });
      assert.equal(schemaBase.schema.properties.atomName.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, undefined);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
    }

    // mode: allowSpecificFields_1
    async _parseSchema_mode_allowSpecificFields_1({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_1,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, true);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, undefined);
    }

    // mode: allowSpecificFields_2
    async _parseSchema_mode_allowSpecificFields_2({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_2,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, false);
      assert.equal(schemaBase.schema.properties.details, undefined);
    }

    // mode: allowSpecificFields_3
    async _parseSchema_mode_allowSpecificFields_3({ atomClass }) {
      const schemaBase = await this.ctx.bean.fields.parseSchema({
        atomClass,
        fieldsRight: __testData_allowSpecificFields_3,
      });
      assert.equal(schemaBase.schema.properties.atomName, undefined);
      assert.equal(schemaBase.schema.properties.detailsAmount.ebReadOnly, false);
      assert.equal(schemaBase.schema.properties.details.ebReadOnly, true);
    }
  }
  return FieldsController;
};
