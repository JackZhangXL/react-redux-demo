import { incrementNum, decrementNum, clearNum } from '../actions/number'
import * as constant from '../configs/action';

const initialState = {
    number: 0,
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case constant.INCREMENT:
            return Object.assign({}, state, {
                number: incrementNum
            });
        case constant.DECREMENT:
            return Object.assign({}, state, {
                number: decrementNum
            });
        case constant.CLEAR_NUM:
            return Object.assign({}, state, {
                number: clearNum
            });
        default:
            return state
    }
}


import createReducer from '@dp/hornet-lib/createReducer';

import * as actionConst from '../configs/action';

const defaultState = {
    shopId: '',
    queryEffectLaunchedShopRsp: null,
};

export default createReducer(defaultState, {
    [actionConst.INITIALIZE_SHOP_LIST]: (state, action) => {
        return {
            ...state,
            ...action.data,
        };
    },
    [actionConst.UPDATE_SHOP_ID]: (state, action) => {
        return {
            ...state,
            shopId: action.shopId,
        };
    },
});
