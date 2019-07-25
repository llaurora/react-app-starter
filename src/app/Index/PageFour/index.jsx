import React, { useState, useMemo } from 'react';
import Child from './components/Child';

export default function PageFour() {
  const [obj, setObject] = useState({
    count: 0,
    name: 'hooks',
  });

  const handleChange = useMemo(() => {
    console.log('传递给子组件的方法');
  }, []);

  return (
    <div>
      <h3>这是第4页</h3>
      <hr />
      Count: {obj.count}
      <br />
      <button
        type="button"
        onClick={() => setObject({ ...obj, count: obj.count + 1 })}
      >
        点我+
      </button>
      <button
        type="button"
        onClick={() => setObject({ ...obj, count: obj.count - 1 })}
      >
        点我-
      </button>
      <Child handleChange={handleChange} />
    </div>
  );
}
