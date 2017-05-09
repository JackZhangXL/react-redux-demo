import fetch from 'isomorphic-fetch';
import * as constant from '../configs/action';
import { sleep } from '../lib/common';

// export default {
//     requestData: () => ({
//         type: constant.REQUEST_DATA,
//     }),
//     receiveData: (data) => ({
//         type: constant.RECEIVE_DATA,
//         data,
//     }),
// };

const requestData = () => ({
    type: constant.REQUEST_DATA,
});

const receiveData = (data) => ({
    type: constant.RECEIVE_DATA,
    data: data.msg,
});


const doFetchData = () => async(dispatch) => {
    dispatch(requestData());
    await sleep(1000);      // Just 4 mock
    return fetch('./api/fetchSampleData.json')
        .then((response) => response.json())
        .then((json) => dispatch(receiveData(json)));
};

const canFetchData = (state) => {
    return !state.fetchData.fetching;
};

export default {
    fetchDataAction: () => (dispatch, getState) => {
        if (canFetchData(getState())) {
            return dispatch(doFetchData());
        }
        return Promise.resolve();
    },
};
