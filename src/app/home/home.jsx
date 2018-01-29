import React from "react";
import {connect} from "react-redux";

import {changeLoginState} from "../../redux/login/loginAction.jsx";//Action Creator
@connect(
    state=>({loginInfo:state.loginInfo}),//从redux状态树用什么取什么
    dispatch => {
        return {
            cancelLogin(type,data){dispatch(changeLoginState(type,data))}
        }
    }
)

class Home extends React.Component{
    constructor(props){
        super(props);
        this.goCancelLogin=this.goCancelLogin.bind(this);
    }
    goCancelLogin(){
        let type="CANCEL_LOGIN_STATE",data={userName:"改变后的用户名"};
        this.props.cancelLogin(type,data)
    }
    render(){
        let {userName}=this.props.loginInfo.userInfo;
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
