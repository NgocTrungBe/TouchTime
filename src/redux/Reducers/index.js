import { combineReducers } from 'redux';
import authReducer from './Auth';
import appReducer from './App';
import chatReducer from './Chat';
const rootReducer = combineReducers({ auth: authReducer, appData: appReducer, chatData: chatReducer });
export default rootReducer;