import { 
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_TOPMASTERS_LIST_FAIL,
  USER_TOPMASTERS_LIST_REQUEST,
  USER_TOPMASTERS_LIST_SUCCESS,
  USER_SIGNIN_FAIL, 
  USER_SIGNIN_REQUEST, 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNOUT, 
  USER_SIGNUP_FAIL, 
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_ASSETS_REQUEST,
  USER_ASSETS_SUCCESS,
  USER_ASSETS_FAIL,
  USER_SCREENS_REQUEST,
  USER_SCREENS_SUCCESS,
  USER_SCREENS_FAIL,
  USER_VIDEOS_REQUEST,
  USER_VIDEOS_SUCCESS,
  USER_VIDEOS_FAIL,
  USER_TOPALLIES_LIST_REQUEST,
  USER_TOPALLIES_LIST_SUCCESS,
  USER_TOPALLIES_LIST_FAIL,
  USER_CHANNELS_FAIL,
  USER_CHANNELS_SUCCESS,
  USER_CHANNELS_REQUEST,
  USER_FILMS_FAIL,
  USER_FILMS_SUCCESS,
  USER_FILMS_REQUEST,
  USER_TOPBRANDS_LIST_REQUEST,
  USER_TOPBRANDS_LIST_SUCCESS,
  USER_TOPBRANDS_LIST_FAIL,
  USER_SHOPS_FAIL,
  USER_SHOPS_SUCCESS,
  USER_SHOPS_REQUEST,
  USER_ITEMS_FAIL,
  USER_ITEMS_SUCCESS,
  USER_ITEMS_REQUEST
} from "../Constants/userConstants";

export const userSignupReducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload};
  default:
    return state;
  }
}


export const userSigninReducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload};
    case USER_SIGNOUT:
      return {};
  default:
    return state;
  }
}

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch(action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch(action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload};
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};


export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userTopMasterListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPMASTERS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPMASTERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPMASTERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userTopAllyListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPALLIES_LIST_REQUEST:
      return { loading: true };
    case USER_TOPALLIES_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPALLIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userTopBrandListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPBRANDS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPBRANDS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPBRANDS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get user assets list

function userAssetsReducer (state = {assets:[]},action) {
  switch(action.type){
    case USER_ASSETS_REQUEST:
      return {loading:true};
    case USER_ASSETS_SUCCESS:
      return {loading:false, assets:action.payload};
    case USER_ASSETS_FAIL:
      return {loading:false,error:action.payload};
    default:
      return state;
  }
}


// get user screens list

function userScreensReducer (state = {screens:[]},action) {
  switch(action.type){
    case USER_SCREENS_REQUEST:
      return {loading:true};
    case USER_SCREENS_SUCCESS:
      return {loading:false, screens:action.payload};
    case USER_SCREENS_FAIL:
      return {loading:false,error:action.payload};
    default:
      return state;
  }
}


// get user video list

function userVideosReducer (state = {videos:[]},action) {
  switch(action.type){
    case USER_VIDEOS_REQUEST:
      return {loading:true};
    case USER_VIDEOS_SUCCESS:
      return {loading:false, videos:action.payload};
    case USER_VIDEOS_FAIL:
      return {loading:false,error:action.payload};
    default:
      return state;
  }
}

// get user channels list

function userChannelsReducer (state = {channels:[]},action) {
  switch(action.type){
    case USER_CHANNELS_REQUEST:
      return {loading:true};
    case USER_CHANNELS_SUCCESS:
      return {loading:false, channels:action.payload};
    case USER_CHANNELS_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}


// get user film list

function userFilmsReducer (state = {films:[]},action) {
  switch(action.type){
    case USER_FILMS_REQUEST:
      return {loading:true};
    case USER_FILMS_SUCCESS:
      return {loading:false, films:action.payload};
    case USER_FILMS_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}

// get user Item list

function userShopsReducer (state = {shops:[]},action) {
  switch(action.type){
    case USER_SHOPS_REQUEST:
      return {loading:true};
    case USER_SHOPS_SUCCESS:
      return {loading:false, shops:action.payload};
    case USER_SHOPS_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}

// get user Item list

function userItemsReducer (state = {items:[]},action) {
  switch(action.type){
    case USER_ITEMS_REQUEST:
      return {loading:true};
    case USER_ITEMS_SUCCESS:
      return {loading:false, items:action.payload};
    case USER_ITEMS_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}


export {
  userAssetsReducer,
  userScreensReducer,
  userVideosReducer, 
  userChannelsReducer,
  userFilmsReducer, 
  userShopsReducer,
  userItemsReducer
};
