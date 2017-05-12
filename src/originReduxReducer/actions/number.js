import * as constant from '../configs/action';

export const incrementNum = () => ({
    type: constant.INCREMENT,
});

export const decrementNum = () => ({
    type: constant.DECREMENT,
});

export const clearNum = () => ({
    type: constant.CLEAR_NUM,
});
