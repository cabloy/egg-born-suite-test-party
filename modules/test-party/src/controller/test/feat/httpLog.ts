module.exports = class HttpLogController {
  async httpLog() {
    // please see: {projectDir}/src/backend/logs/{projectName}/{projectName}-web.log
    this.ctx.success('this is a test for httpLog');
  }
};
