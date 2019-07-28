import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Home({ userName }) {
  return <span>Hi,欢迎你，{userName}</span>;
}

Home.propTypes = {
  userName: PropTypes.string,
};

Home.defaultProps = {
  userName: '',
};

export default connect(
  // state => ({
  //   userName: state.loginInfo.userInfo.userName,
  // }), // 从redux状态树用什么取什么
  ({
    loginInfo: {
      userInfo: { userName },
    },
  }) => ({
    userName,
  }), // 从redux状态树用什么取什么
)(Home);
