import { 
  REVIEW_VIDEO_FAIL,
  REVIEW_VIDEO_REQUEST,
  REVIEW_VIDEO_SUCCESS,
  LIKE_VIDEO_FAIL,
  LIKE_VIDEO_REQUEST,
  LIKE_VIDEO_SUCCESS,
  VIDEO_DELETE_FAIL,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_SUCCESS,
  VIDEO_DETAILS_FAIL,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIEWS_VIDEO_FAIL,
  VIEWS_VIDEO_REQUEST,
  VIEWS_VIDEO_SUCCESS,
  UNLIKE_VIDEO_REQUEST,
  UNLIKE_VIDEO_SUCCESS,
  UNLIKE_VIDEO_FAIL,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
  VIDEO_UPDATE_FAIL,
  VIDEO_UPDATE_RESET,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_RESET,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  VIDEO_DELETE_RESET,
  VIDEO_PARAMS_REQUEST,
  VIDEO_PARAMS_SUCCESS,
  VIDEO_PARAMS_FAIL,
  VIDEO_FLAG_FAIL,
  VIDEO_FLAG_REQUEST,
  VIDEO_FLAG_SUCCESS
} from "../Constants/videoConstants";

function videoListAllReducer(state = {allVideos:[]}, action) {
  switch (action.type) {
    case VIDEO_LIST_REQUEST:
      return { loading: true };
    case VIDEO_LIST_SUCCESS:
      return { loading: false, allVideos: action.payload };
    case VIDEO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function videoDetailsReducer(state = {loading: true}, action) {
  switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
    return { loading: true };
    case VIDEO_DETAILS_SUCCESS:
    return { loading: false, video: action.payload };
    case VIDEO_DETAILS_FAIL:
    return { loading: false, error: action.payload };
    default: return state;
  }
}

function videoUploadReducer(state = {}, action) {
  switch(action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return { loading: true };
    case UPLOAD_VIDEO_SUCCESS:
      return {loading: false, uploadedVideo: action.payload, success: true};
    case UPLOAD_VIDEO_FAIL:
      return {loading: false, error: action.payload};
    case UPLOAD_VIDEO_RESET:
      return {};
    default:
      return state;
  }
}

function videoDeleteReducer(state = {}, action) {
  switch (action.type) {
    case VIDEO_DELETE_REQUEST:
      return { loading: true };
    case VIDEO_DELETE_SUCCESS:
      return { loading: false, success: true};
    case VIDEO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_DELETE_RESET:
      return {};
      default:
      return state;
  }
}

function videoLikeReducer(state = { video: {} }, action) {
  switch (action.type) {
    case LIKE_VIDEO_REQUEST:
      return { loading: true };
    case LIKE_VIDEO_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true };
    case LIKE_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function videoUnlikeReducer(state = { video: {} }, action) {
  switch (action.type) {
    case UNLIKE_VIDEO_REQUEST:
      return { loading: true };
    case UNLIKE_VIDEO_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true };
    case UNLIKE_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// video flag
function videoFlagReducer (state = { video: {} }, action) {
  switch(action.type){
    case VIDEO_FLAG_REQUEST:
      return { loading: true };
    case VIDEO_FLAG_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true }; 
    case VIDEO_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function videoViewReducer(state = { video: {} }, action) {
  switch (action.type) {
    case VIEWS_VIDEO_REQUEST:
      return { loading: true };
    case VIEWS_VIDEO_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case VIEWS_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function videoReviewReducer(state = { video: {} }, action) {
  switch (action.type) {
    case REVIEW_VIDEO_REQUEST:
      return { loading: true };
    case REVIEW_VIDEO_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case REVIEW_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



function videoUpdateReducer(state = { video: {} }, action) {
  switch (action.type) {
    case VIDEO_UPDATE_REQUEST:
      return { loading: true };
    case VIDEO_UPDATE_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case VIDEO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}


function videoParamsReducer (state = {loading: false}, action) {
  switch (action.type) {
    case VIDEO_PARAMS_REQUEST:
      return {loading: true};
    case VIDEO_PARAMS_SUCCESS:
      return {loading: false, params: action.payload};
    case VIDEO_PARAMS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export {
  videoFlagReducer,
  videoParamsReducer,
  videoListAllReducer,
  videoDetailsReducer,
  videoUploadReducer,
  videoDeleteReducer,
  videoLikeReducer,
  videoUnlikeReducer,
  videoReviewReducer,
  videoViewReducer,
  videoUpdateReducer 
};