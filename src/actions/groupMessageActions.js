
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function getGroupConversationHistory(parmas) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_GROUP_CONVERSATION';
    serviceParams.params = parmas;
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

export function createGroupSucess(data) {
    return {
        type: ACTIONS.CREATE_GROUP_SUCCESS,
        data
    }
}