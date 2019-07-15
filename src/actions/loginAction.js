
import { ACTIONS } from '../constants/Constants';
import { constructUrl } from '../services/api';

export function setCurrentUser(data) {
    return {
        type: ACTIONS.SET_CURRENT_USER,
        data
    }
}
