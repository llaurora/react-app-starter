import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "./aside.scss";

import * as loginAction from "../../../../redux/login/loginAction.jsx";//Action Creator

@connect(
    null,
    dispatch=>bindActionCreators({...loginAction},dispatch)
)

class Aside extends React.Component{
    static propTypes = {
        changeLoginState:PropTypes.func,
    };
    constructor(props){
        super(props);
        this.goLogOff=this.goLogOff.bind(this);
    }
    goLogOff(){
        let type="LOGIN-OFF",data={id:"我退出登录了"};
        this.props.changeLoginState(type,data);
        sessionStorage.removeItem("username");
        this.props.history.push("/")
    }
    render(){
        return(
            <div id="asideNav">
                <div className="logArea">
                    <NavLink to={"/"}><img src={require("../../../../asset/images/logo.png")}/></NavLink>
                </div>
                <div className="nav">
                    <p>组件列表</p>
                    <ul>
                        <li>
                            <NavLink to="/pageone" activeStyle={{color: "#f73352"}}>第一页</NavLink>
                        </li>
                        <li>
                            <NavLink to="/pagetwo" activeStyle={{color: "#f73352"}}>第二页</NavLink>
                        </li>
                    </ul>
                </div>
                <i className="iconfont icon-tuichu1" onClick={this.goLogOff}/>
            </div>
        )
    }
}

export default Aside


