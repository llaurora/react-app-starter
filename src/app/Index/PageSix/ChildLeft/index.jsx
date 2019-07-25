import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';
import memoize from 'memoize-one';

// const fbcSelector = createSelector(
//   [({ numB }) => numB, ({ numC }) => numC], // 此数组里面的值对应传给下面计算函数
//   (b, c) => {
//     console.log(b, c, 'fbc');
//     return b + c;
//   },
// );
//
// const fabcSelector = createSelector(
//   [({ numA }) => numA, ({ numB }) => numB, ({ numC }) => numC],
//   (a, b, c) => {
//     console.log(a, b, c, 'fabc');
//     return a + b + c;
//   },
// );

/* reselect 和 memoize-one 都同样可以用于对计算结果做缓存(入参不变则不再重复计算，直接使用上次的缓存结果)；
   注意点：这儿的入参不变，如果入参是引用数据类型，是直接比对的引用，当然这两个库都可以自定义比较规则；

   之所以这儿选择使用 memoize-one ，而不是使用 reselect ；
   其一：memoize-one 的大小比 reselect 小， 一个18k左右，一个168k左右；
   其二：memoize-one 的写法及使用起来比 reselect 简单方便；
 */

const fbcSelector = memoize((numB, numC) => {
  console.log(numB, numC, 'fbc');
  return numB + numC;
});

const fabcSelector = memoize((numA, numB, numC) => {
  console.log(numA, numB, numC, 'fabc');
  return numA + numB + numC;
});

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
    fbc: fbcSelector(numB, numC), // fbcSelector({ numB, numC })
    fabc: fabcSelector(numA, numB, numC), // fabcSelector({ numA, numB, numC })
  };
})(ChildLeft);
