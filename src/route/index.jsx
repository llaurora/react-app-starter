import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { PersistGate } from 'redux-persist/integration/react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { store, persistor } from './configureStore';
import globalLoading from '../asset/images/globalLoading.gif';
import '../asset/style/common.scss';

const Login = lazy(() => import('../app/Login')); // 登录页面
const Index = lazy(() => import('../app/Index')); // 登录后主页

const IndexRoute = connect(({ loginInfo: { isLogin } }) => ({
  isLogin,
}))(({ component: Component, isLogin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin ? ( // 登录与否 页面验证
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
));

IndexRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object,
};

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
            <IndexRoute path="/" component={Index} />
          </Switch>
        </Router>
      </Suspense>
    </PersistGate>
  </Provider>
);

export default hot(Routers);
