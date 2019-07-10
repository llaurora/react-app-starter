import { combineReducers } from 'redux';
import loginInfo from './Login/loginReducer';
import testPersist from './PageFive/pageFiveReducer';
import testReselect from './PageSix/pageSixReducer';

const rootReducer = combineReducers({
  loginInfo,
  testPersist,
  testReselect,
});

export default rootReducer;
