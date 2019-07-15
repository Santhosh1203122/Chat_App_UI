
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function getIndividualConversationHistory(parmas) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_INDIVIDUAL_CONVERSATION';
    serviceParams.params = parmas;
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