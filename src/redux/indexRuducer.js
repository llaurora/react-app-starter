import { combineReducers } from 'redux';
import userInfo from './Login/loginReducer';
import testPersist from './PageFive/pageFiveReducer';
import testReselect from './PageSix/pageSixReducer';

const rootReducer = combineReducers({
  userInfo,
  testPersist,
  testReselect,
});

export default rootReducer;
