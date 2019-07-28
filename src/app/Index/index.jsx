import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Aside from './components/Aside';
import './style.scss';

const Home = lazy(() => import('./Home')); // 登录后主页
const NoMatch = lazy(() => import('./NoMatch')); // 404没有匹配页面
const PageOne = lazy(() => import('./PageOne')); // 第一页
const PageTwo = lazy(() => import('./PageTwo')); // 第二页
const PageThree = lazy(() => import('./PageThree')); // 第三页
const PageFour = lazy(() => import('./PageFour')); // 第四页
const PageFive = lazy(() => import('./PageFive')); // 第五页
const PageSix = lazy(() => import('./PageSix')); // 第六页
const PageSeven = lazy(() => import('./PageSeven')); // 第七页

export default function Index({ history }) {
  return (
    <div id="indexArea">
      <Aside history={history} />
      <div id="routeContent">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pageone" component={PageOne} />
          <Route path="/pagetwo" component={PageTwo} />
          <Route path="/pagethree" component={PageThree} />
          <Route path="/pagefour" component={PageFour} />
          <Route path="/pagefive" component={PageFive} />
          <Route path="/pagesix" component={PageSix} />
          <Route path="/pageseven" component={PageSeven} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
};
