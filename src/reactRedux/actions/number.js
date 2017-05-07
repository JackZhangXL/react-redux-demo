import * as constant from '../configs/action';

export default {
    incrementNum: (num) => ({
        type: constant.INCREMENT,
        num,
    }),
    decrementNum: (num) => ({
        type: constant.DECREMENT,
        num,
    }),
    clearNum: (num) => ({
        type: constant.CLEAR_NUM,
        num,
    }),
};
