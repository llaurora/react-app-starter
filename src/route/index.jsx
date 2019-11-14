import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { store, persistor } from './configureStore';
import { AuthorizedLogin } from '@/components/Authorized';
import globalLoading from '@/asset/images/globalLoading.gif';
import '@/asset/styles/global.scss';

const Login = lazy(() => import('@/pages/Login')); // 登录页面
const Index = lazy(() => import('@/pages/Index')); // 登录后主页

const Loading = () => {
  const style = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={{ ...style }}>
      <img src={globalLoading} alt="加载中..." />
    </div>
  );
};

const supportsHistory = 'pushState' in window.history;

const Routers = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loading />}>
        <Router forceRefresh={!supportsHistory}>
          <Switch>
            <Route path="/login" component={Login} />
            <AuthorizedLogin path="/" component={Index} />
          </Switch>
        </Router>
      </Suspense>
    </PersistGate>
  </Provider>
);

export default hot(Routers);
