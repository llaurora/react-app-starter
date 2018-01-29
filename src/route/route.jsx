import React from "react";
import {Route,BrowserRouter as Router,Switch,Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import Cookie from "../components/cookie/cookie.jsx";

import asyncComponent from "./asyncComponent/asyncComponent.jsx";//按需加载
import rootReducer from "../redux/indexRuducer.jsx";//引入Reducer 一般一个项目把所有redcer集中在一个Reducer返回
const store=createStore(//创建应用的唯一的store
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))// applyMiddleware(thunk,logger)
);

const Login=asyncComponent(()=>import("../app/login/login.jsx"));//登录页面
const Layout=asyncComponent(()=>import("./layout/layout.jsx"));//登录后主页

const LayoutRoute = ({component:Component,...rest }) => (
    <Route {...rest} render={props => (
        Cookie.getCookie("username") ? (//登录与否 页面验证
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: "/login",
                state:{from:props.location}
            }}/>
        )
    )}/>
);

const Routers =()=>{
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <LayoutRoute path="/" component={Layout}/>
                    </Switch>
                </Router>
            </Provider>
        )
};

export default Routers
