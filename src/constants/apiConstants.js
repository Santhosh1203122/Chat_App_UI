export const APICONSTANTS = {
    GET_INITIAL_DETAILS: {
        endPoint: 'getInitialDetails',
        method: 'GET', // GET, POST, DELETE
        containsParams: true
    },
    GET_INDIVIDUAL_CONVERSATION: {
        endPoint: 'getMessageHistoryForUsers',
        method: 'GET', // GET, POST, DELETE
        containsParams: true
    },
    SEND_INDIVIDUAL_MESSAGE: {
        endPoint: 'sendDirectMessage',
        method: 'POST', // GET, POST, DELETE
        containsParams: true
    },
    GET_GROUP_CONVERSATION: {
        endPoint: 'getMessageHistoryForGroup',
        method: 'GET', // GET, POST, DELETE
        containsParams: true
    },
    CREATE_GROUP: {
        endPoint: 'createGroup',
        method: 'POST', // GET, POST, DELETE
        containsParams: true
    },
    SEND_GROUP_MESSAGE: {
        endPoint: 'sendGroupMessage',
        method: 'POST', // GET, POST, DELETE
        containsParams: true
    },
    CREATE_IM: {
        endPoint: 'createIm',
        method: 'POST', // GET, POST, DELETE
        containsParams: true
    },
    SEARCH_USER: {
        endPoint: 'searchUsers',
        method: 'GET', // GET, POST, DELETE
        containsParams: true
    },
    GET_CHANNEL_DETAILS: {
        endPoint: 'getChannelDetails',
        method: 'GET', // GET, POST, DELETE
        containsParams: true
    },
    UPDATE_GROUP: {
        endPoint: 'updateGroup',
        method: 'POST',
        containsParams: true
    },
    SEND_THREAD_MESSAGE: {
        endPoint: 'sendThreadMessage',
        method: 'POST',
        containsParams: true
    },
    GET_THREAD_CONVERSATION_HISTORY: {
        endPoint: 'getThreadMessage',
        method: 'GET',
        containsParams: true
    }
}