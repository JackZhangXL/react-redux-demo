import * as constant from '../configs/action';

const initialState = {
    number: 0,
};

// 原先是number，现在state为object
export default (state = initialState, action) => {
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
        default:
            return state;
    }
};
