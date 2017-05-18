import * as constant from '../configs/action';
import { createReducer } from '../lib/common';

const initialState = {
    fetching: false,
    data: null,
};

export default createReducer(initialState, {
    [constant.REQUEST_DATA]: (state, action) => {
        return {
            ...state,
            fetching: true,
        };
    },
    [constant.RECEIVE_DATA]: (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.data,
        };
    },
});
