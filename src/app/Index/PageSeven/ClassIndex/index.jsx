import React from 'react';
import memoize from 'memoize-one';
// import { createSelector } from 'reselect';
import Child from '../components/Child';

export default class ClassIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 1,
      count2: 1,
    };
  }

  componentDidMount() {
    this.getListSource();
  }

  handleSetCount = () => {
    this.setState(preState => ({
      count: preState.count + 1,
    }));
  };

  getListSource = () => {
    setTimeout(() => {
      this.setState({
        list: [
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
        ],
      });
    }, 3000);
  };

  // filterListFunc = createSelector(
  //   arr => arr, // 返回的值对应传给下面计算函数
  //   arr => {
  //     console.log('Class进来计算了');
  //     return arr.filter(item => item.id % 2 === 0);
  //   },
  // );

  filterListFunc = memoize((arr = []) => {
    console.log('Class进来计算了');
    return arr.filter(item => item.id % 2 === 0);
  });

  render() {
    const { count, count2, list } = this.state;
    const filterList = this.filterListFunc(list);
    return (
      <div>
        <h3>用 ES6 Class 构建组件</h3>
        <hr />
        Count: {count}
        Count2: {count2}
        <br />
        <button type="button" onClick={this.handleSetCount}>
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
}
