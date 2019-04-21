import { call, put, takeEvery, takeLatest, all, select, take } from 'redux-saga/effects';
import { fetchDataApi } from './api/index';
import * as constant from './configs/action';
import { sleep } from './lib/common';

function* alertAsync(action) {
    yield sleep(1000);
    yield put({ type: constant.TOGGLE_ALERT_ASYNC });
}

function* fetchData(action) {       // 参数是 actionCreator 创建的 action
    try {
        yield put({ type: constant.REQUEST_DATA });
        yield sleep(1000);
        const data = yield call(fetchDataApi, action.data);
        yield put({ type: constant.RECEIVE_DATA, data });
    } catch (e) {
        yield put({ type: constant.FETCH_DATA_FAILED, errMsg: e.message });
    }
}

export function* watchAlertAsync() {
    yield takeEvery(constant.TOGGLE_ALERT, alertAsync);
}

export function* watchFetchData() {
    yield takeEvery(constant.FETCH_DATA, fetchData);
}

function* watchAndLog() {
    while (true) {
        const action = yield take('*');
        const state = yield select();

        console.log('action', action);
        console.log('state after', state);
    }
    // 和上面是等价的
    // yield takeEvery('*', function* logger(action) {
    //     const state = yield select();
    //
    //     console.log('action', action);
    //     console.log('state after', state);
    // });
}

export default function* rootSaga() {
    yield all([
        watchAndLog(),
        watchAlertAsync(),
        watchFetchData(),
    ]);
}
