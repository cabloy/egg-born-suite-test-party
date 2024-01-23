import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleTestParty } from '../index.js';

@Controller()
export class ControllerTestFeatHttpLog extends BeanBase {
  @Use()
  scope: ScopeModuleTestParty;

  async httpLog() {
    // please see: {projectDir}/src/backend/logs/{projectName}/{projectName}-web.log
    this.ctx.success('this is a test for httpLog');
  }
}
