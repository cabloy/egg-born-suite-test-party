import LoginBackPC from '../assets/login/login-back-pc.jpg';

export default {
  meta: {
    title: 'Sign In',
  },
  data() {
    return {};
  },
  render() {
    const style = {
      backgroundImage: `url(${LoginBackPC})`,
    };
    return (
      <eb-page no-toolbar={false} no-navbar={true} no-swipeback={true} style={style}>
        {this._renderTitle()}
        {this._renderMenu()}
        {this._renderBody()}
        {this._renderFooter()}
      </eb-page>
    );
  },
  methods: {
    _renderTitle() {
      return null;
    },
    _renderMenu() {
      return null;
    },
    _renderBody() {
      const options = {
        props: {
          showTitle: true,
        },
      };
      return (
        <div class="login-wrapper">
          <eb-component module="a-login" name="login" options={options}></eb-component>
        </div>
      );
    },
    _renderFooter() {},
  },
};
