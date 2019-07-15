
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function initialAction(parmas) {
    const serviceParams = {};
    serviceParams.apiName = 'GET_INITIAL_DETAILS';
    serviceParams.params = parmas;
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
export function setCurrentModeDetails(data) {
    return {
        type: ACTIONS.SET_CURRENT_MODE_DETAILS,
        data
    }
}
