import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PageFive({ dispatch, count, operator }) {
  function dispatchTestPersist() {
    dispatch({
      type: 'TEST_PERSIST_STATE',
      data: {
        count: count + 100,
        operator: `${operator}1`,
      },
    });
  }

  return (
    <div>
      <h3>这是第5页</h3>
      <hr />
      <p>count：{count}</p>
      <p>operator: {operator}</p>
      <br />
      <button type="button" onClick={dispatchTestPersist}>
        点我+
      </button>
    </div>
  );
}

PageFive.propTypes = {
  dispatch: PropTypes.func,
  count: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
};

PageFive.defaultProps = {
  dispatch: () => {},
};

export default connect(
  ({ testPersist: { count, operator } }) => ({
    count,
    operator,
  }), // 从redux状态树用什么取什么
)(PageFive);
