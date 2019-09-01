import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuthority } from '../util';

const AuthorizedRender = ({ authority, userAllAuthority, children }) =>
  checkAuthority(authority, userAllAuthority) ? children : null;

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
