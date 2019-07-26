import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from '../redux/indexRuducer'; // 引入Reducer 一般一个项目把所有redcer集中在一个Reducer返回

const persistConfig = {
  storage: storageSession,
  key: 'root',
  whitelist: ['testPersist', 'loginInfo'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  // 创建应用的唯一的store
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)), // applyMiddleware(thunk,logger)
);

export const persistor = persistStore(store);
