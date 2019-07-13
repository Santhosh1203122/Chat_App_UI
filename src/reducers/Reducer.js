import { ACTIONS } from '../constants/Constants';

const intialState = {
    videoList: [],
    totalNoOfVideos: 0,
    searchField: '',
    lastPageRequested: 1,
    isLastSetOfData: false
};

function VideoReducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.GET_VIDEO_DATA_SUCCESS:
            return Object.assign({}, state, { videoList: state.videoList.concat(action.data['contentItems'].content), isLastSetOfData: action.data['isLastSetOfData'], lastPageRequested: action.data['pageNumRequested']})
        case ACTIONS.SEARCH_VIDEO_SUCCESS_ACTION:
            return Object.assign({}, state, { videoList: action.data });
        case ACTIONS.SEARCH_VIDEO_ACTION:
            return Object.assign({}, state, { searchField: action.searchParams });
        case ACTIONS.CLEAR_VIDEO_ACTION:
            return Object.assign({}, state, { videoList: [] });
        default:
            return state;
    }
}

export default VideoReducer; 