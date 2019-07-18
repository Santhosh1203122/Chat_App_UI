
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function getIndividualConversationHistory(params) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_INDIVIDUAL_CONVERSATION';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY,
        requestData
    }
}
export function sendIndividualMessage(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'SEND_INDIVIDUAL_MESSAGE';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.SEND_INDIVIDUAL_MESSAGE,
        requestData
    }
}
export function getIndividualConversationHistorySucess(data) {
    return {
        type: ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS,
        data
    }
}
export function individualConversationSentSuccess(data) {
    return {
        type: ACTIONS.SEND_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS,
        data
    }
}

export function sendThreadMessage(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'SEND_THREAD_MESSAGE';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.SEND_THREAD_MESSAGE,
        requestData
    }
}

export function sendImInvite(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'CREATE_IM';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.CREATE_IM,
        requestData
    }
}
export function createImSucess(data) {
    return {
        type: ACTIONS.CREATE_IM_SUCESS,
        data
    }
}

export function sendThreadMessagesSuccess(data) {
    return {
        type: ACTIONS.SEND_THREAD_MESSAGE_SUCESS,
        data
    }
}
export function getThreadsHistroy(params) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_THREAD_CONVERSATION_HISTORY';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.GET_THREAD_CONVERSATION_HISTORY,
        requestData
    }
}

export function getThreadsHistroySuccess(data) {
    return {
        type: ACTIONS.GET_THREAD_CONVERSATION_HISTORY_SUCESS,
        data
    }
}