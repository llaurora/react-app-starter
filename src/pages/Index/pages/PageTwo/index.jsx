import React from 'react';
import { AuthorizedRender } from '@/components/Authorized';

export default function PageTwo() {
  return (
    <div>
      <h3>这是第二页</h3>
      <AuthorizedRender authority={['pageone1']}>
        <button type="button">测试细粒度组件权限控制(没有权限)</button>
      </AuthorizedRender>
      <AuthorizedRender authority={['pageone']}>
        <button type="button">测试细粒度组件权限控制(权限通过)</button>
      </AuthorizedRender>
    </div>
  );
}
