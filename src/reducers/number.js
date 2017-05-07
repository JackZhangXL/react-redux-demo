import * as constant from '../configs/action';

const initialState = {
    number: 0,
    showAlert: false,
};

// 原先是number，现在state为object
export const changeNumber = (state = initialState, action) => {
    switch (action.type) {
        case constant.INCREMENT:
            return {
                ...state,
                number: state.number + 1,
            };
        case constant.DECREMENT:
            return {
                ...state,
                number: state.number - 1,
            };
        case constant.CLEAR_NUM:
            return {
                ...state,
                number: 0,
            };
        case constant.SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
            };
        case constant.HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
            };
        default:
            return state;
    }
};
