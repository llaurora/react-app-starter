import React from "react";
import {Route,Switch} from "react-router-dom";
import Aside from "./components/aside/aside.jsx";
import asyncComponent from "../../route/asyncComponent/asyncComponent.jsx";//按需加载

const Home=asyncComponent(()=>import("./home/home.jsx"));//登录后主页
const PageOne=asyncComponent(()=>import("./pageOne/pageOne.jsx"));//第一页
const PageTwo=asyncComponent(()=>import("./PageTwo/PageTwo.jsx"));//第二页

class Index extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="mainBox">
                <div className="bodyBox">
                    <Aside history={this.props.history} pathname={this.props.location}/>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/pageone" component={PageOne}/>
                        <Route path="/pagetwo" component={PageTwo}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index