import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PageFive({ count, dispatch }) {
  function dispatchTestPersist() {
    dispatch({
      type: 'TEST_PERSIST_STATE',
      data: count + 100,
    });
  }

  return (
    <div>
      <h3>这是第5页</h3>
      <hr />
      <span>count：{count}</span>
      <br />
      <button type="button" onClick={dispatchTestPersist}>
        点我+
      </button>
    </div>
  );
}

PageFive.propTypes = {
  count: PropTypes.number,
  dispatch: PropTypes.func,
};

PageFive.defaultProps = {
  count: 100,
  dispatch: () => {},
};

export default connect(
  ({ testPersist: { count } }) => ({
    count,
  }), // 从redux状态树用什么取什么
)(PageFive);
