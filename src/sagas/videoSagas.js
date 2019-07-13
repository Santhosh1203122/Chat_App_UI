import { ACTIONS } from '../constants/Constants';
import {triggerApi} from '../services/api';
import {call, put, fork, takeLatest } from 'redux-saga/effects';
// import { getVideoDataSuccess } from '../actions/videoActions';
function* defaultSaga() {
    //
}

function* fetchVideoData(data) {
    try {
        // const resultData = yield call(triggerApi, data);
        // if (resultData) {
        //     yield put(getVideoDataSuccess(resultData))
        // }
    } catch (err) {
        console.log(err);
    }
}

function* getVideoByPageNumber() {
    yield takeLatest(ACTIONS.GET_VIDEO_ACTION, fetchVideoData);
}

export default function* videoSaga() {
    yield fork(getVideoByPageNumber);
}