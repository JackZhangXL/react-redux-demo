import { combineReducers } from 'redux';
import changeNumber from './number';
import toggleAlert from './alert';
import fetchData from './fetchData';

export default combineReducers({
    changeNumber,
    toggleAlert,
    fetchData,
});
