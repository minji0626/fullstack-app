import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: 'root', // key 이름
    storage // localStorage에 저장합니다
    // whitelist : [],  // 여러 reducer 중에 해당 reducer만 localStorage에wjwkd
    // blacklist: [] // blacklist -> 그것만 제외외
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
    // 직렬화 (serialize) : object 값을 string 값으로 변환 (JSON.stringify)
    // 역직렬화 (deserialize) : string 값을 object 값으로 변환 (JSON.parse)
    // Redux는 state,action에 직렬화가 불가능한 겂을 전달할 수 없는데 전달하려고 하니 에러가 발생
    // 직렬화가 불가능한 값 전달을 허락하면 된다.
})
export const persistor = persistStore(store);
