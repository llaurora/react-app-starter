import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// const fbcSelector = ({ numB, numC }) => {
//   console.log(numB, numC, 'fbc');
//   return numB + numC;
// };
// const fabcSelector = ({ numA, numB, numC }) => {
//   console.log(numA, numB, numC, 'fbc');
//   return numA + numB + numC;
// };

const fbcSelector = createSelector(
  [({ numB }) => numB, ({ numC }) => numC], // 此数组里面的值对应传给下面计算函数
  (b, c) => {
    console.log(b, c, 'fbc');
    return b + c;
  },
);

const fabcSelector = createSelector(
  [({ numA }) => numA, ({ numB }) => numB, ({ numC }) => numC],
  (a, b, c) => {
    console.log(a, b, c, 'fabc');
    return a + b + c;
  },
);

function ChildLeft({ numA, numB, numC, numD, fbc, fabc, bool }) {
  console.log('左侧组件渲染');
  return (
    <div>
      <h5>这是此页左侧子组件{`${bool}`}</h5>
      <ul>
        <li>numA：{numA}</li>
        <li>numB：{numB}</li>
        <li>numC：{numC}</li>
        <li>numD：{numD}</li>
        <li>fbc：{fbc}</li>
        <li>fabc：{fabc}</li>
      </ul>
    </div>
  );
}

ChildLeft.propTypes = {
  numA: PropTypes.number,
  numB: PropTypes.number,
  numC: PropTypes.number,
  numD: PropTypes.number,
  fbc: PropTypes.number,
  fabc: PropTypes.number,
  bool: PropTypes.bool,
};

ChildLeft.defaultProps = {
  numA: 0,
  numB: 0,
  numC: 0,
  numD: 0,
  fbc: 0,
  fabc: 0,
  bool: false,
};

export default connect(({ testReselect: { numA, numB, numC, numD } }) => {
  console.log('mapState', 'ChildLeft');
  return {
    numA,
    numB,
    numC,
    numD,
    fbc: fbcSelector({ numB, numC }),
    fabc: fabcSelector({ numA, numB, numC }),
  };
})(ChildLeft);
