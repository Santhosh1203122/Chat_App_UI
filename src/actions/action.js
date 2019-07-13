
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function actionName(parmas) {
    const serviceParams = {};
    serviceParams.apiName = 'API_NAME';
    serviceParams.params = parmas;
    const requestData = constructUrl(serviceParams);
    return {
        type: ACTIONS.ACTION_NAME,
        requestData
    }
}
