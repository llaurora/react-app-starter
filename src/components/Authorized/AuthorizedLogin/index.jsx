import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedLogin = ({ component: Component, isLogin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin ? ( // 登录与否 页面验证
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

AuthorizedLogin.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  isLogin: PropTypes.bool,
};

AuthorizedLogin.defaultProps = {
  isLogin: PropTypes.false,
};

export default connect(({ userInfo: { isLogin } }) => ({
  isLogin,
}))(AuthorizedLogin);
