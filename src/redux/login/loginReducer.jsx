export default function loginReducer(loginInfo={isLogin:false,userInfo:{}}, action) {
    switch (action.type) {
        case "STORE_LOGIN_STATE":
            return Object.assign({},loginInfo,{isLogin:true,userInfo:action.data});
        case "CANCEL_LOGIN_STATE":
            return Object.assign({},loginInfo,{isLogin:false,userInfo:action.data});
        case "LOGIN-OFF":
            return Object.assign({},loginInfo,{isLogin:false,userInfo:action.data});
        default:
            return {...loginInfo}
    }
}