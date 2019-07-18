import { ACTIONS } from '../constants/Constants';
import { triggerApi } from '../services/api';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { initialActionSucess, searchUserSucess, getChannelDetailSuccess } from '../actions/sideBaraction';
import { getIndividualConversationHistorySucess, individualConversationSentSuccess, createImSucess, sendThreadMessagesSuccess, getThreadsHistroySuccess } from '../actions/directMessageActions';
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

function* createNewIm(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(createImSucess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* searchUserFromDB(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(searchUserSucess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* getChannelDetail(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(getChannelDetailSuccess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}
function* updateGroupMembers(data) {
    try {
        const resultData = yield call(triggerApi, data);
    } catch (err) {
        console.log(err);
    }
}

function* sendThreadMessages(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(sendThreadMessagesSuccess(resultData))
        }
    } catch (err) {
        console.log(err);
    }
}

function* getThreadHistoryData(data) {
    try {
        const resultData = yield call(triggerApi, data);
        if (resultData) {
            yield put(getThreadsHistroySuccess(resultData))
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

function* sendGroupMessage() {
    yield takeLatest(ACTIONS.SEND_GROUP_MESSAGE, sendIMMessage);
}

function* createGroup() {
    yield takeLatest(ACTIONS.CREATE_GROUP, createNewGroup);
}

function* createIm() {
    yield takeLatest(ACTIONS.CREATE_IM, createNewIm);
}

function* searchUser() {
    yield takeLatest(ACTIONS.SEARCH_USER, searchUserFromDB);
}

function* getChannelDetails() {
    yield takeLatest(ACTIONS.GET_CHANNEL_DETAILS, getChannelDetail);
}

function* updateGroup() {
    yield takeLatest(ACTIONS.UPDATE_GROUP, updateGroupMembers);
}

function* sendThreadMessage() {
    yield takeLatest(ACTIONS.SEND_THREAD_MESSAGE, sendThreadMessages);
}

function* getThreadHistory() {
    yield takeLatest(ACTIONS.GET_THREAD_CONVERSATION_HISTORY, getThreadHistoryData);
}


export default function* initialDetailsSaga() {
    yield fork(getInitialUserDetails);
    yield fork(getDirectMessageConversationSaga);
    yield fork(getGroupMessageConversationSaga);
    yield fork(sendMessage);
    yield fork(createGroup);
    yield fork(sendGroupMessage);
    yield fork(createIm);
    yield fork(searchUser);
    yield fork(getChannelDetails);
    yield fork(updateGroup);
    yield fork(sendThreadMessage);
    yield fork(getThreadHistory);
}