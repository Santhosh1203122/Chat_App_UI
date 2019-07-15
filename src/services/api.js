import axios from "axios";
import { APICONSTANTS } from '../constants/apiConstants';

export function triggerApi(apiData) {
    // const payload = apiData.requestData.request.href;
    switch (apiData.requestData.method) {
        case 'GET':
            return axios.get(apiData.requestData.request.href).then(res => {
                return res.data;
            });
        case 'POST':
            return axios.post(apiData.requestData.request.href, apiData.requestData.payload).then(res => {
                return res.data;
            });
        default:
            return
    }
};

export function constructUrl(inputParams) {
    const apiData = APICONSTANTS[inputParams.apiName];
    const serverUrl = 'http://localhost:3001/api/';
    let apiUrl = new URL(serverUrl + apiData.endPoint);

    if (apiData.containsParams && inputParams.params) {
        Object.keys(inputParams.params).forEach((key, index) => {
            apiUrl.searchParams.append(key, inputParams.params[key])
        });
    }

    return { method: apiData.method, request: apiUrl, payload: inputParams.payload };
}