import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './index.scss';

function ChildCenter({ userName }) {
  console.log('中间组件渲染');
  return (
    <div className={styles.childCenter}>
      <h5>这是此页中间子组件</h5>
      <span>从Redux上取用户名：{userName}</span>
    </div>
  );
}

ChildCenter.propTypes = {
  userName: PropTypes.string,
};

ChildCenter.defaultProps = {
  userName: '',
};

export default connect(({ userInfo: { userName } }) => {
  console.log('mapState', 'ChildCenter');
  return {
    userName,
  };
})(ChildCenter);
