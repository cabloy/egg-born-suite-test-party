const __viewSizeDefaultLayoutView = [{ name: 'default' }];
const __viewSizeDefaultLayoutEdit = [{ name: 'default' }];
const __viewSizeDefaultView = {
  small: __viewSizeDefaultLayoutView,
  medium: __viewSizeDefaultLayoutView,
  large: __viewSizeDefaultLayoutView,
};
const __viewSizeDefaultEdit = {
  small: __viewSizeDefaultLayoutEdit,
  medium: __viewSizeDefaultLayoutEdit,
  large: __viewSizeDefaultLayoutEdit,
};
const item = {
  info: {
    layout: {
      viewSize: {
        view: __viewSizeDefaultView,
        edit: __viewSizeDefaultEdit,
      },
    },
  },
  layouts: {},
};
export default item;
