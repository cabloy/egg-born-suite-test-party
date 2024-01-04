import { randomUUID } from 'crypto';
// import moment, { isMoment } from 'moment';

MyTest;
const a = moment();
const b = randomUUID();
const c = isMoment();

class TestAsync {
  async __testAsync() {
    return moment();
  }
}

export async function getNow() {
  const a = moment.now();
  const b = new TestAsync();
  return await b.__testAsync();
}
