import { combineReducers } from 'redux';
import userInfo from '@/models/userInfo/reducer';
import testPersist from '@/pages/Index/pages/PageFive/models/reducer';
import testReselect from '@/pages/Index/pages/PageSix/models/reducer';

export default combineReducers({
  userInfo,
  testPersist,
  testReselect,
});
