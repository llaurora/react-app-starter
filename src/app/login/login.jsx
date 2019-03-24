import React from "react";
// import Particles from "react-particles-js";
import classNames from "classnames";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Checkbox from "../../components/checkbox/checkbox.jsx";
import Api from "@api";
import {fetchRequest} from "@util";
import Cookie from "../../components/cookie/cookie.jsx";
import msgAlert from "../../components/msgalert/msgalert.jsx";
import "./login.scss";

import * as loginAction from "../../redux/login/loginAction.jsx";//Action Creator

@connect(
    null,
    dispatch=>bindActionCreators({...loginAction},dispatch)
)

class Login extends React.Component{
    static propTypes = {
        changeLoginState:PropTypes.func,
    };
    constructor(props){
        super(props);
        this.state={
            userName:window.atob?window.atob(Cookie.getCookie("user")):Cookie.getCookie("user") || null,
            uesPwd:window.atob?window.atob(Cookie.getCookie("pwd")):(Cookie.getCookie("pwd")) || null,
            errorTips:null,
            userFocus:false,
            pwdFocus:false,
            isRemberPed:true,
            showFade:false
        };
        this.onCheckedChange=this.onCheckedChange.bind(this);
        this.goLogin=this.goLogin.bind(this);
        this.rememberPwd=this.rememberPwd.bind(this);
    }
    componentDidMount(){
        document.addEventListener("keyup",(e)=>{
            if(e.keyCode === 13){
                this.goLogin()
            }
        });
    }
    onCheckedChange(ischecked){
        this.setState({
            isRemberPed:ischecked
        })
    }
    showTips(tip){
        this.setState({
            errorTips:tip,
            showFade:true
        });
        setTimeout(()=>{
            this.setState({
                showFade:false
            })
        },1000)
    }
    rememberPwd(){
        let{userName,uesPwd}=this.state;
        Cookie.setCookie("user",window.btoa?window.btoa(userName):userName,7);
        Cookie.setCookie("pwd",window.btoa?window.btoa(uesPwd):uesPwd,7);
    }
    goLogin(){
        let {uesPwd,userName,isRemberPed}=this.state;
        if(!uesPwd && !userName){
            this.showTips("请输入用户名和密码");
            return;
        }
        if(!userName){
            this.showTips("请输入用户名");
            return;
        }
        if(!uesPwd){
            this.showTips("请输入密码");
            return;
        }
        let sendData = {
            username: userName,
            password: uesPwd,
        };
        fetchRequest({
            url:Api.login,
            type:"get"
        }).then((data)=>{
            if(isRemberPed){
                this.rememberPwd();
            }
            sessionStorage.setItem("username",data.name);
            this.props.history.push("/");
            let type="STORE_LOGIN_STATE";
            this.props.changeLoginState(type,data)
        }).catch((data)=>{
            this.showTips(data.errorMsg);
        })
    }
    render(){
        let {userName,userFocus,uesPwd,pwdFocus,isRemberPed,showFade,errorTips}=this.state;
        return(
            <div id="loginBox">
                <div className="login-item">
                    <img src={require("../../asset/images/logo.png")}/>
                    <div className={classNames("login-input-box",{userFocus:userFocus})}>
                        <i className="iconfont icon-yonghu1"/>
                        <input type="text" placeholder="请输入用户名" value={userName}
                               onChange={(e)=>{this.setState({userName:e.target.value})}}
                               onFocus={()=>{this.setState({userFocus:true})}}
                               onBlur={()=>{this.setState({userFocus:false})}}
                        />
                    </div>
                    <div className={classNames("login-input-box",{pwdFocus:pwdFocus})}>
                        <i className="iconfont icon-yuechi"/>
                        <input type="password" placeholder="请输入密码" value={uesPwd}
                               onChange={(e)=>{this.setState({uesPwd:e.target.value})}}
                               onFocus={()=>{this.setState({pwdFocus:true})}}
                               onBlur={()=>{this.setState({pwdFocus:false})}}
                        />
                    </div>
                    <div className="ieRemPwd">
                        <Checkbox defaultChecked={isRemberPed} labelText="记住密码" onCheckedChange={this.onCheckedChange}/>
                    </div>
                    <button onClick={this.goLogin}>立即登录</button>
                    <p className={classNames({fadeAnimation:showFade})}>*{errorTips}</p>
                </div>
            </div>
        )
    }
}

export default Login;

