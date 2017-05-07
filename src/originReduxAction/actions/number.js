import * as constant from '../configs/action';

export const incrementNum = (num) => ({
    type: constant.INCREMENT,
    num,
});

export const decrementNum = (num) => ({
    type: constant.DECREMENT,
    num,
});

export const clearNum = (num) => ({
    type: constant.CLEAR_NUM,
    num,
});
