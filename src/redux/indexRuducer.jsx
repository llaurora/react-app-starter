import {combineReducers} from "redux";
import loginReducer from "./login/loginReducer.jsx";

const rootReducer=combineReducers({
    loginInfo:loginReducer
});

export default rootReducer