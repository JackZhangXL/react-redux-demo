import * as constant from '../configs/action';

export default {
    showAlert: () => ({
        type: constant.SHOW_ALERT,
    }),
    hideAlert: () => ({
        type: constant.HIDE_ALERT,
    }),
};
