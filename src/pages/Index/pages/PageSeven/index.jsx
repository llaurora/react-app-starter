import React from 'react';
import ClassIndex from './components/ClassIndex';
import HooksIndex from './components/HooksIndex';
import styles from './index.scss';

export default function PageSeven() {
  return (
    <div>
      <h3>这是第7页</h3>
      <hr />
      <p>用于测试memoize-one</p>
      <br />
      <div className={styles.sevenChildLayout}>
        <ClassIndex />
        <HooksIndex />
      </div>
    </div>
  );
}
