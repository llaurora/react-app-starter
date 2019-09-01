import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthorizedRender = ({ authority, userAllAuthority, children }) => {
  const checkAuthority = authorityList => {
    let isCheckPass = true; // 如果不传递authority，则不进行权限校验
    if (authorityList.length) {
      isCheckPass = !!authorityList.find(item =>
        userAllAuthority.includes(item),
      );
    }
    return isCheckPass;
  };

  return checkAuthority(authority) ? children : null;
};

AuthorizedRender.propTypes = {
  authority: PropTypes.array, // 用户权限集合
  userAllAuthority: PropTypes.array, // 用户所拥有全部权限集合
};

AuthorizedRender.defaultProps = {
  authority: [],
  userAllAuthority: [],
};

export default connect(({ userInfo: { authority } }) => ({
  userAllAuthority: authority,
}))(AuthorizedRender);
