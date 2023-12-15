module.exports = function SelfFactory(app) {
  class ProgressController {
    async progress() {
      // create progress
      const progressId = await this.ctx.bean.progress.create();
      // background
      this.ctx.meta.util.runInBackground(async ({ ctx }) => {
        const selfInstance = new (SelfFactory(app))(ctx);
        await selfInstance._progressInBackground({ progressId });
      });
      // return progressId
      this.ctx.success({ progressId });
    }

    async _progressInBackground({ progressId }) {
      try {
        // level one
        await this._levelOne({ progressId, progressNo: 0 });
        // progress done
        await this.ctx.bean.progress.done({ progressId, message: this.ctx.text('Well Done') });
        // ok
        this.ctx.success(true);
      } catch (err) {
        // progress error
        await this.ctx.bean.progress.error({ progressId, message: err.message });
        // throw err
        throw err;
      }
    }

    async _levelOne({ progressId, progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level One')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
        // level two
        await this._levelTwo({ progressId, progressNo: progressNo + 1 });
      }
    }

    async _levelTwo({ progressId, progressNo }) {
      const total = 2;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level Two')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
        // level two
        await this._levelThree({ progressId, progressNo: progressNo + 1 });
      }
    }

    async _levelThree({ progressId, progressNo }) {
      const total = 3;
      let current = 0;
      for (let i = 0; i < total; i++) {
        const text = `${this.ctx.text('Level Three')}: ${i + 1}`;
        await this.ctx.bean.progress.update({
          progressId,
          progressNo,
          total,
          progress: current++,
          text,
        });
        // sleep
        await this.ctx.bean.util.sleep(1500);
      }
    }
  }
  ;
