
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function getGroupConversationHistory(params) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_GROUP_CONVERSATION';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.GET_GROUP_CONVERSATION_HISTORY,
        requestData
    }
}

export function getGroupConversationHistorySucess(data) {
    return {
        type: ACTIONS.GET_GROUP_CONVERSATION_HISTORY_SUCCESS,
        data
    }
}

export function createGroup(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'CREATE_GROUP';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.CREATE_GROUP,
        requestData
    }
}

export function updateGroup(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'UPDATE_GROUP';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.UPDATE_GROUP,
        requestData
    }
}

export function createGroupSucess(data) {
    return {
        type: ACTIONS.CREATE_GROUP_SUCCESS,
        data
    }
}

export function sendGroupMessage(payload) {
    const serviceParams = {};
    serviceParams.apiName = 'SEND_GROUP_MESSAGE';
    serviceParams.payload = payload;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.SEND_GROUP_MESSAGE,
        requestData
    }
}