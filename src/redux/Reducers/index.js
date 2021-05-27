import { combineReducers } from 'redux';
import authReducer from './Auth';
import appReducer from './App';
const rootReducer = combineReducers({ auth: authReducer, appData: appReducer });
export default rootReducer;