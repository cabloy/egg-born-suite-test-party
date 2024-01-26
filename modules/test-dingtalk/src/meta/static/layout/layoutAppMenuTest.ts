import { __ThisModule__ } from '../../../resource/this.js';

const content = {
  layouts: {
    list: {
      blocks: {
        items: {
          component: {
            module: __ThisModule__,
            name: 'appTestMenuLayoutBlockListItems',
          },
        },
      },
    },
  },
};
const layout = {
  atomName: 'Test App Menu Layout(Dingtalk)',
  atomStaticKey: 'layoutAppMenuTest',
  atomRevision: 0,
  description: '',
  layoutTypeCode: 13,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
export default layout;
