import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { store, persistor } from './configureStore';
import { AuthorizedLogin } from '@/components/Authorized';
import Loading from '@/components/Loading';
import '@/asset/styles/global.scss';

const Login = lazy(() => import('@/pages/Login')); // 登录页面
const Index = lazy(() => import('@/pages/Index')); // 登录后主页

const supportsHistory = 'pushState' in window.history;

const Routers = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loading scope="global" />}>
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
