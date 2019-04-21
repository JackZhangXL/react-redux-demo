import * as constant from '../configs/action';

export default {
    fetchDataAction: (data) => ({
        type: constant.FETCH_DATA,
        data,
    }),
};
