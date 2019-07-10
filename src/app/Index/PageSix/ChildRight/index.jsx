import React from 'react';

function ChildRight() {
  console.log('右侧组件渲染');
  return (
    <div>
      <h5>这是此页右侧子组件</h5>
    </div>
  );
}

export default React.memo(ChildRight);
