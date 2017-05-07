import * as constant from '../configs/action';

const initialState = {
    showAlert: false,
};

// 原先是number，现在state为object
export default (state = initialState, action) => {
    switch (action.type) {
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
