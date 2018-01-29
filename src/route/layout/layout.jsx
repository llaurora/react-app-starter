import React from "react";
import {Route} from "react-router-dom";
import Aside from "./aside/aside.jsx";
import asyncComponent from "../asyncComponent/asyncComponent.jsx";//按需加载

const Home=asyncComponent(()=>import("../../app/home/home.jsx"));//登录后主页
const PageOne=asyncComponent(()=>import("../../app/pageOne/pageOne.jsx"));//第一页
const PageTwo=asyncComponent(()=>import("../../app/PageTwo/PageTwo.jsx"));//第二页

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="mainBox">
                <div className="bodyBox">
                    <Aside history={this.props.history}/>
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

export default Layout