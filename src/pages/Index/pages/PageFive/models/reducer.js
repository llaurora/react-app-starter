import produce from 'immer';
import storage from 'redux-persist/lib/storage'; // 持久化处理方式，默认为localStorage
import { persistReducer } from 'redux-persist';

const initialState = { count: 100, operator: 'operator', bool: false };

const testPersistReducer = produce((draft, action) => {
  if (action.type === 'TEST_PERSIST_STATE') {
    draft.count = action.data.count;
    draft.operator = action.data.operator;
  }
}, initialState);

// 只对部分state做持久化处理，比如这儿只想对count做持久化处理

const persistConfig = {
  storage,
  key: 'testPersist', // 这儿的key和邻近的上层的key属性保持一致
  whitelist: ['count'],
};

export default persistReducer(persistConfig, testPersistReducer);
