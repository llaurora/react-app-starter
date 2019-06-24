import React, { useState } from 'react';

export default function PageFour() {
  const [obj, setObject] = useState({
    count: 0,
    name: 'hooks',
  });
  return (
    <div className="App">
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
    </div>
  );
}
