import { combineReducers,  configureStore } from '@reduxjs/toolkit';
 import userReducer from './user/user.slice.js';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/theme.slice.js';


const rootReducer = combineReducers({
    user : userReducer ,
    theme : themeReducer ,
    
});

const persistConfig = {
    key :'root' ,
    storage,
    version :1 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),
    
 });
 export const persistor = persistStore(store);