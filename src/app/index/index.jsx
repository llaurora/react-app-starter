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
        this.state={
            count:0
        }
    }
    add=()=>{
       this.setState({
           count:this.state.count+1
       })
    };
    render(){
        return(
            <div className="mainBox">
                <div className="bodyBox">
                    <Aside history={this.props.history} pathname={this.props.location}/>
                    <div>
                        {/*<Route exact path="/" component={Home}/>*/}
                        {/*<Route path="/pageone" component={PageOne}/>*/}
                        {/*<Route path="/pagetwo" component={PageTwo}/>*/}
                        <h1>dddff12333dd</h1>
                        <hr/>
                        <h2>当前count为{this.state.count}</h2>
                        <button onClick={this.add}>Count+</button>
                        <p>rkkk</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index