import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import * as loginAction from "../../../redux/login/loginAction.jsx";//Action Creator

@connect(
    state=>({userName:state.loginInfo.userInfo.userName}),//从redux状态树用什么取什么
    dispatch=>bindActionCreators({...loginAction},dispatch)
)

class Home extends React.Component{
    static propTypes = {
        changeLoginState:PropTypes.func,
    };
    constructor(props){
        super(props);
        this.goCancelLogin=this.goCancelLogin.bind(this);
    }
    goCancelLogin(){
        const type="CANCEL_LOGIN_STATE",data={userName:`${this.props.userName}+改变加1`};
        this.props.changeLoginState(type,data)
    }
    render(){
        const {userName}=this.props;
        return(
            <div>
                <h1>Hi，欢迎你</h1>
                <p>用户名是:{userName || "用户没有登录"}</p>
                <button onClick={this.goCancelLogin}>点我改变登录信息</button>
            </div>
        )
    }
}

export default Home;
