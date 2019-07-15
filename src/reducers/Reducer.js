import { ACTIONS } from '../constants/Constants';

const intialState = {
    userDetails: {},
    groups: [],
    directMessage: [],
    threads: [],
    conversations: [],
    currentUserId: 1,
    selectedId: null,
    selectedMode: null
};

function Reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.GET_INITIAL_DATA_SUCESS:
            const responseData = action.data;
            return Object.assign({}, state, { userDetails: responseData, groups: responseData.groups, directMessage: responseData.im_users, threads: responseData.threads });
        case ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS:
            return Object.assign({}, state, { conversations: action.data });
        case ACTIONS.SET_CURRENT_MODE_DETAILS:
            return Object.assign({}, state, { selectedId: action.data.id, selectedMode: action.data.type });
        case ACTIONS.SEND_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS:
            return Object.assign({}, state, { conversations: state.conversations.concat(action.data) });
        case ACTIONS.SET_CURRENT_USER:
            return Object.assign({}, state, { currentUserId: action.data.id });
        case ACTIONS.CREATE_GROUP_SUCCESS:
            return Object.assign({}, state, { groups: state.groups.concat(action.data) });
        default:
            return state;
    }
}

export default Reducer; 