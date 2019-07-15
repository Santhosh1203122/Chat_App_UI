import { ACTIONS } from '../constants/Constants';
import {triggerApi} from '../services/api';
import {call, put, fork, takeLatest } from 'redux-saga/effects';
import { getIndividualConversationHistorySucess } from '../actions/directMessageActions';

function* defaultSaga() {
    //
}

function* fetchConversationHistory(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(getIndividualConversationHistorySucess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* getDirectMessageConversationSaga() {
    yield takeLatest(ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY, fetchConversationHistory);
}

export default function* DirectMessageSaga() {
    yield fork(getDirectMessageConversationSaga);
}