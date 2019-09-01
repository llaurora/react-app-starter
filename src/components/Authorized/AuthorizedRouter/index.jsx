import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRouter = ({
  authority,
  userAllAuthority,
  component: Component,
  ...rest
}) => {
  const checkAuthority = authorityList => {
    let isCheckPass = true; // 如果不传递authority，则不进行权限校验
    if (authorityList.length) {
      isCheckPass = !!authorityList.find(item =>
        userAllAuthority.includes(item),
      );
    }
    return isCheckPass;
  };
  return (
    <Route
      {...rest}
      render={props =>
        checkAuthority(authority) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/noauthorized',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

AuthorizedRouter.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  authority: PropTypes.array, // 用户权限集合
  userAllAuthority: PropTypes.array, // 用户所拥有全部权限集合
};

AuthorizedRouter.defaultProps = {
  authority: [],
  userAllAuthority: [],
};

export default connect(({ userInfo: { authority } }) => ({
  userAllAuthority: authority,
}))(AuthorizedRouter);
