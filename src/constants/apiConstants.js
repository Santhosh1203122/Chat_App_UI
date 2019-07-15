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
    SEND_INDIVIDUAL_MESSAGE : {
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
    }
}