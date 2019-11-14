import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { AuthorizedRouter } from '@/components/Authorized';
import Aside from './components/Aside';
import styles from './index.scss';

const Home = lazy(() => import('./pages/Home')); // 登录后主页
const NoMatch = lazy(() => import('./pages/NoMatch')); // 404没有匹配页面
const NoAuthorized = lazy(() => import('./pages/NoAuthorized')); // 没有权限
const PageOne = lazy(() => import('./pages/PageOne')); // 第一页
const PageTwo = lazy(() => import('./pages/PageTwo')); // 第二页
const PageThree = lazy(() => import('./pages/PageThree')); // 第三页
const PageFour = lazy(() => import('./pages/PageFour')); // 第四页
const PageFive = lazy(() => import('./pages/PageFive')); // 第五页
const PageSix = lazy(() => import('./pages/PageSix')); // 第六页
const PageSeven = lazy(() => import('./pages/PageSeven')); // 第七页

export default function Index({ history }) {
  return (
    <div id={styles.indexArea}>
      <Aside history={history} />
      <div id={styles.routeContent}>
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthorizedRouter
            path="/pageone"
            component={PageOne}
            authority={['pageone']}
          />
          {/* 如果不传递authority，用AuthorizedRouter或者 Route 作用一样，不进行权限校验/> */}
          <AuthorizedRouter path="/pagetwo" component={PageTwo} />
          <Route path="/pagethree" component={PageThree} />
          <Route path="/pagefour" component={PageFour} />
          <Route path="/pagefive" component={PageFive} />
          <Route path="/pagesix" component={PageSix} />
          <Route path="/pageseven" component={PageSeven} />
          <Route path="/noauthorized" component={NoAuthorized} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
};
