import {configureStore, createStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../features/user_slice'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage,
    whitelist:['user']
}
const rootreducer=combineReducers({
    user:userReducer
    
    
})
export default persistReducer(persistConfig,rootreducer)


