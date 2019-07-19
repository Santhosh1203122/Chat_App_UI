
import { ACTIONS } from '../constants/Constants';

export function getCurrentUser(data) {
    return {
        type: ACTIONS.SET_CURRENT_USER,
        data
    }
}
