import { combineReducers } from 'redux';
import loginInfo from './Login/loginReducer';
import testPersist from './PageFive/pageFiveReducer';

const rootReducer = combineReducers({
  loginInfo,
  testPersist,
});

export default rootReducer;
