import React,{lazy,Suspense} from "react";
import thunk from 'redux-thunk';
import {Route,BrowserRouter as Router,Switch,Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import {hot} from "react-hot-loader/root"
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "../redux/indexRuducer.jsx";//引入Reducer 一般一个项目把所有redcer集中在一个Reducer返回
const store=createStore(//创建应用的唯一的store
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))// applyMiddleware(thunk,logger)
);

const Login=lazy(()=>import("../app/login/login.jsx"));//登录页面
const Index=lazy(()=>import("../app/index/index.jsx"));//登录后主页


const IndexRoute = ({component:Component,...rest }) => (
    <Route {...rest} render={props => (
        sessionStorage.getItem("username") ? (//登录与否 页面验证
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <IndexRoute path="/" component={Index}/>
                        </Switch>
                    </Router>
                </Suspense>
            </Provider>
        )
};

export default hot(Routers);