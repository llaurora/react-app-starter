import React from 'react';

function Child() {
  console.log('子组件渲染');
  return <div style={{ marginTop: '15px' }}>Child</div>;
}

export default React.memo(Child);
