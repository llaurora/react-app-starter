import React from "react";
import {NavLink,browserHistory} from 'react-router-dom';
import {connect} from "react-redux";
import Cookie from "../../../components/cookie/cookie.jsx";
import "./aside.scss";

import {changeLoginState} from "../../../redux/login/loginAction.jsx";//Action Creator

@connect(
    null,
    dispatch => {
        return {
            logoOff(type,data){dispatch(changeLoginState(type,data))}
        }
    }
)
class Aside extends React.Component{
    constructor(props){
        super(props);
        this.goLogOff=this.goLogOff.bind(this);
    }
    goLogOff(){
        let type="LOGIN-OFF",data={id:"我退出登录了"};
        this.props.logoOff(type,data);
        Cookie.removeCookie("username");
        this.props.history.push("/")
    }
    render(){
        return(
            <div id="asideNav">
                <div className="logArea">
                    <NavLink to={"/"}><img src={require("../../../asset/images/logo.png")}/></NavLink>
                </div>
                <div className="nav">
                    <p>组件列表</p>
                    <ul>
                        <li>
                            <NavLink to="/pageone" activeStyle={{color: '#f73352'}}>第一页</NavLink>
                        </li>
                        <li>
                            <NavLink to="/pagetwo" activeStyle={{color: '#f73352'}}>第二页</NavLink>
                        </li>
                    </ul>
                </div>
                <i className="iconfont icon-tuichu1" onClick={this.goLogOff}/>
            </div>
        )
    }
}

export default Aside


