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
                {/*<Particles*/}
                    {/*className="particles"*/}
                    {/*params={{*/}
                        {/*"particles": {*/}
                            {/*"number": {*/}
                                {/*"value": 30,*/}
                                {/*"density": {*/}
                                    {/*"enable": true,*/}
                                    {/*"value_area": 1200*/}
                                {/*}*/}
                            {/*},*/}
                            {/*"color": {*/}
                                {/*"value": "#fff"*/}
                            {/*},*/}
                            {/*"shape": {*/}
                                {/*"type": ["circle","star"],*/}
                                {/*"stroke": {*/}
                                    {/*"width": 0,*/}
                                    {/*"color": "#000000"*/}
                                {/*}*/}
                            {/*},*/}
                            {/*"opacity": {*/}
                                {/*"value": 0.3,*/}
                                {/*"random": false,*/}
                                {/*"anim": {*/}
                                    {/*"enable": false,*/}
                                    {/*"speed": 1,*/}
                                    {/*"opacity_min": 0.1,*/}
                                    {/*"sync": false*/}
                                {/*}*/}
                            {/*},*/}
                            {/*"size": {*/}
                                {/*"value": 5,*/}
                                {/*"random": true,*/}
                                {/*"anim": {*/}
                                    {/*"enable": false,*/}
                                    {/*"speed": 80,*/}
                                    {/*"size_min": 0.1,*/}
                                    {/*"sync": false*/}
                                {/*}*/}
                            {/*},*/}
                            {/*"line_linked": {*/}
                                {/*"enable": true,*/}
                                {/*"distance": 150,*/}
                                {/*"color": "#fff",*/}
                                {/*"opacity": 0.2,*/}
                                {/*"width": 2*/}
                            {/*},*/}
                            {/*"move": {*/}

                                {/*"enable": true,*/}
                                {/*"speed": 2,*/}
                                {/*"direction": "none",*/}
                                {/*"random": false,*/}
                                {/*"straight": false,*/}
                                {/*"out_mode": "out",*/}
                                {/*"bounce": false,*/}
                                {/*"attract": {*/}
                                    {/*"enable": false,*/}
                                    {/*"rotateX": 600,*/}
                                    {/*"rotateY": 1200*/}
                                {/*}*/}
                            {/*}*/}
                        {/*},*/}
                        {/*"interactivity": {*/}
                            {/*"detect_on": "canvas",*/}
                            {/*"events": {*/}
                                {/*"onhover": {*/}
                                    {/*"enable": true,*/}
                                    {/*"mode": "grab"*/}
                                {/*},*/}
                                {/*"onclick": {*/}
                                    {/*"enable": true,*/}
                                    {/*"mode": "push"*/}
                                {/*},*/}
                                {/*"resize": true*/}
                            {/*},*/}
                            {/*"modes": {*/}
                                {/*"grab": {*/}
                                    {/*"distance": 150,*/}
                                    {/*"line_linked": {*/}
                                        {/*"opacity": 0.7*/}
                                    {/*}*/}
                                {/*},*/}
                                {/*"bubble": {*/}
                                    {/*"distance": 800,*/}
                                    {/*"size": 80,*/}
                                    {/*"duration": 2,*/}
                                    {/*"opacity": 0.8,*/}
                                    {/*"speed": 3*/}
                                {/*},*/}
                                {/*"repulse": {*/}
                                    {/*"distance": 400,*/}
                                    {/*"duration": 0.4*/}
                                {/*},*/}
                                {/*"push": {*/}
                                    {/*"particles_nb": 4*/}
                                {/*},*/}
                                {/*"remove": {*/}
                                    {/*"particles_nb": 2*/}
                                {/*}*/}
                            {/*}*/}
                        {/*},*/}
                        {/*"retina_detect": true*/}
                    {/*}}*/}
                {/*/>*/}
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

