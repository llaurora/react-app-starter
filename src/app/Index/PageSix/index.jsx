import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChildLeft from './ChildLeft';
import ChildCenter from './ChildCenter';
import ChildRight from './ChildRight';
import './style.scss';

function PageSix({ dispatch, numA, numB, numC, numD }) {
  const [bool, setBool] = useState(false);

  function toggleBool() {
    setBool(!bool);
  }

  function dispatchTestReselect(type) {
    const numobj = {
      numA,
      numB,
      numC,
      numD,
    };
    dispatch({
      type: `CHANGE_SIX_STATE_${type}`,
      data: numobj[`num${type}`] + 20,
    });
  }

  return (
    <div>
      <h3>这是第6页</h3>
      <hr />
      <p>父组件状态改变,此时toggle值为{`${bool}`}</p>
      <button type="button" onClick={toggleBool}>
        点我1
      </button>
      <button
        type="button"
        style={{ marginLeft: '20px' }}
        onClick={() => dispatchTestReselect('A')}
      >
        点我A
      </button>
      <button
        type="button"
        style={{ marginLeft: '20px' }}
        onClick={() => dispatchTestReselect('B')}
      >
        点我B
      </button>
      <button
        type="button"
        style={{ marginLeft: '20px' }}
        onClick={() => dispatchTestReselect('C')}
      >
        点我C
      </button>
      <button
        type="button"
        style={{ marginLeft: '20px' }}
        onClick={() => dispatchTestReselect('D')}
      >
        点我D
      </button>
      <div className="pageSixContent">
        <ChildLeft bool={bool} />
        <ChildCenter />
        <ChildRight />
      </div>
    </div>
  );
}

PageSix.propTypes = {
  dispatch: PropTypes.func,
  numA: PropTypes.number,
  numB: PropTypes.number,
  numC: PropTypes.number,
  numD: PropTypes.number,
};

PageSix.defaultProps = {
  dispatch: () => {},
  numA: 0,
  numB: 0,
  numC: 0,
  numD: 0,
};

export default connect(({ testReselect: { numA, numB, numC, numD } }) => ({
  numA,
  numB,
  numC,
  numD,
}))(PageSix);
