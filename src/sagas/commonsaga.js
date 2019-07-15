import { ACTIONS } from '../constants/Constants';
import { triggerApi } from '../services/api';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { initialActionSucess } from '../actions/sideBaraction';
import { getIndividualConversationHistorySucess, individualConversationSentSuccess } from '../actions/directMessageActions';
import { createGroupSucess } from '../actions/groupMessageActions';

function* defaultSaga() {
        //
    }

function* fetchInitialUserDetails(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(initialActionSucess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
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
function* sendIMMessage(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(individualConversationSentSuccess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* createNewGroup(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(createGroupSucess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* getInitialUserDetails() {
    yield takeLatest(ACTIONS.GET_INITIAL_DATA, fetchInitialUserDetails);
}

function* getDirectMessageConversationSaga() {
    yield takeLatest(ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY, fetchConversationHistory);
}

function* getGroupMessageConversationSaga() {
    yield takeLatest(ACTIONS.GET_GROUP_CONVERSATION_HISTORY, fetchConversationHistory);
}

function* sendMessage() {
    yield takeLatest(ACTIONS.SEND_INDIVIDUAL_MESSAGE, sendIMMessage);
}

function* createGroup() {
    yield takeLatest(ACTIONS.CREATE_GROUP, createNewGroup);
}

export default function* initialDetailsSaga() {
    yield fork(getInitialUserDetails);
    yield fork(getDirectMessageConversationSaga);
    yield fork(getGroupMessageConversationSaga);
    yield fork(sendMessage);
    yield fork(createGroup);
}