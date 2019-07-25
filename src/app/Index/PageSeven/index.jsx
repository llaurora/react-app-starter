import React from 'react';
import ClassIndex from './ClassIndex';
import HooksIndex from './HooksIndex';
import './style.scss';

export default function PageSeven() {
  return (
    <div>
      <h3>这是第7页</h3>
      <hr />
      <p>用于测试memoize-one</p>
      <br />
      <div className="sevenChildLayout">
        <ClassIndex />
        <HooksIndex />
      </div>
    </div>
  );
}
