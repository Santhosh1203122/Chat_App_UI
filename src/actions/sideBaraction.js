
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function initialAction(params) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_INITIAL_DETAILS';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.GET_INITIAL_DATA,
        requestData
    }
}

export function initialActionSucess(data) {
    return {
        type: ACTIONS.GET_INITIAL_DATA_SUCESS,
        data
    }
}

export function searchUser(params) {
    const serviceParams = {};
    serviceParams.apiName = 'SEARCH_USER';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.SEARCH_USER,
        requestData
    }
}

export function getChannelDetails(params) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_CHANNEL_DETAILS';
    serviceParams.params = params;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.GET_CHANNEL_DETAILS,
        requestData
    }
}


export function searchUserSucess(data) {
    return {
        type: ACTIONS.SEARCH_USER_SUCESS,
        data
    }
}

export function setCurrentModeDetails(data) {
    return {
        type: ACTIONS.SET_CURRENT_MODE_DETAILS,
        data
    }
}

export function getChannelDetailSuccess(data) {
    return {
        type: ACTIONS.GET_CHANNEL_DETAILS_SUCESS,
        data
    }
}

export function updateUnreadDetails(data) {
    return {
        type: ACTIONS.UPDATE_UNREAD_DETAILS,
        data
    }
}

export function pushMessage(data) {
    return {
        type: ACTIONS.PUSH_MESSAGE,
        data
    }
}