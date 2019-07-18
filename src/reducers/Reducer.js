import { ACTIONS } from '../constants/Constants';

const intialState = {
    userDetails: {},
    groups: [],
    directMessage: [],
    threads: [],
    conversations: [],
    currentUserId: null,
    selectedId: null,
    selectedMode: null,
    userSuggestions: [],
    channelDetails: '',
    unreadMessage: {}
};

function Reducer(state = intialState, action) {
    
    switch (action.type) {
        case ACTIONS.GET_INITIAL_DATA_SUCESS:
            const responseData = action.data;
            return Object.assign({}, state, { userDetails: responseData, groups: responseData.groups || [], directMessage: responseData.im_users || [], threads: responseData.threads || [] });
        case ACTIONS.GET_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS:
            return Object.assign({}, state, { conversations: action.data });
        case ACTIONS.SET_CURRENT_MODE_DETAILS:
            const clearUnreadMessageId = (action.data.type !== 'Groups' ? 'Im' : 'Groups') + action.data.id;
            const stateUnreadMessage = Object.assign({}, state.unreadMessage);
            stateUnreadMessage[clearUnreadMessageId] = 0;
            return Object.assign({}, state, { selectedId: action.data.id, selectedMode: action.data.type,  unreadMessage: stateUnreadMessage });
        case ACTIONS.SEND_INDIVIDUAL_CONVERSATION_HISTORY_SUCESS:
            return Object.assign({}, state, { conversations: state.conversations.concat(action.data) });
        case ACTIONS.SET_CURRENT_USER:
            return Object.assign({}, state, { currentUserId: action.data.id });
        case ACTIONS.CREATE_GROUP_SUCCESS:
            return Object.assign({}, state, { groups: state.groups.concat(action.data) });
        case ACTIONS.CREATE_IM_SUCESS:
            return Object.assign({}, state, { directMessage: state.directMessage.concat(action.data) });
        case ACTIONS.SEARCH_USER_SUCESS:
            return Object.assign({}, state, { userSuggestions: action.data });
        case ACTIONS.GET_CHANNEL_DETAILS_SUCESS:
            return Object.assign({}, state, { channelDetails: action.data });
        case ACTIONS.UPDATE_UNREAD_DETAILS:
            const unreadMessageId = (action.data.mode !== 'Groups' ? 'Im' : 'Groups') + action.data.id;
            const unreadMessage = Object.assign({}, state.unreadMessage);
            unreadMessage[unreadMessageId] = state.unreadMessage[unreadMessageId] ? state.unreadMessage[unreadMessageId] + 1 : 1;
            return Object.assign({}, state, { unreadMessage: unreadMessage });
        case ACTIONS.PUSH_MESSAGE:
            return Object.assign({}, state, { conversations: state.conversations.concat(action.data) });
        default:
            return state;
    }
}

export default Reducer; 