import React, { useState, useEffect, useMemo } from 'react';
// import memoize from 'memoize-one';
// import { createSelector } from 'reselect';
import Child from '../components/Child';

// const filterListFunc = createSelector(
//   arr => arr, // 返回的值对应传给下面计算函数
//   arr => {
//     console.log('Hooks进来计算了');
//     return arr.filter(item => item.id % 2 === 0);
//   },
// );

export default function HooksIndex() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getListSource();
  }, []);

  const handleSetCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const getListSource = () => {
    setTimeout(() => {
      setList([
        { id: 1, name: '条目1' },
        { id: 2, name: '条目2' },
        { id: 3, name: '条目3' },
        { id: 4, name: '条目4' },
        { id: 5, name: '条目5' },
        { id: 6, name: '条目6' },
        { id: 7, name: '条目7' },
        { id: 8, name: '条目8' },
        { id: 9, name: '条目9' },
        { id: 10, name: '条目10' },
      ]);
    }, 3000);
  };

  const filterListFunc = (arr = []) => {
    console.log('Hooks进来计算了');
    return arr.filter(item => item.id % 2 === 0);
  };

  const filterList = useMemo(() => filterListFunc(list), [list]);

  return (
    <div>
      <h3>用 Hooks 构建组件</h3>
      <hr />
      Count: {count}
      <br />
      <button type="button" onClick={handleSetCount}>
        点我
      </button>
      <br />
      <p>列表(只显示id为偶数的)</p>
      <ul>
        {filterList.map(item => (
          <li key={item.id}>
            <span>ID是{item.id}</span>
            <span style={{ marginLeft: '15px' }}>条目是{item.name}</span>
          </li>
        ))}
      </ul>
      <Child list={list} />
    </div>
  );
}
