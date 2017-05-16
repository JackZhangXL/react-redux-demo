import * as constant from '../configs/action';

export default {
    incrementNum: () => ({
        type: constant.INCREMENT,
    }),
    decrementNum: () => ({
        type: constant.DECREMENT,
    }),
    clearNum: () => ({
        type: constant.CLEAR_NUM,
    }),
};
