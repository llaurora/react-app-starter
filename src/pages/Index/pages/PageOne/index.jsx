import React from 'react';

export default class PageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.add = this.add.bind(this);
  }

  add() {
    this.setState(preState => ({ count: preState.count + 1 }));
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h3>这是第一页</h3>
        <hr />
        <div>
          <button
            type="button"
            onClick={this.add}
            style={{ marginRight: '15px' }}
          >
            点击增加
          </button>
          <span>
            当前计数<strong>{count}</strong>
          </span>
        </div>
        <p>测试react-hot-loader</p>
      </div>
    );
  }
}
