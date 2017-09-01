import { combineReducers } from 'redux';
// import { combineReducers } from '../lib/common';
import changeNumber from './number';
import toggleAlert from './alert';

export default combineReducers({
    changeNumber,
    toggleAlert,
});
