import * as constant from '../configs/action';

const initialState = {
    fetching: false,
    data: null,
};

// 原先是number，现在state为object
export default (state = initialState, action) => {
    switch (action.type) {
        case constant.REQUEST_DATA:
            return {
                ...state,
                fetching: true,
            };
        case constant.RECEIVE_DATA:
            return {
                ...state,
                fetching: false,
                data: action.data,
            };
        default:
            return state;
    }
};
