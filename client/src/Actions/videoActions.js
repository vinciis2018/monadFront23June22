import axios from 'axios';
import { useQuery } from "react-query";

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
  VIDEO_UPDATE_FAIL,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
  VIEWS_VIDEO_FAIL,
  VIEWS_VIDEO_REQUEST,
  VIEWS_VIDEO_SUCCESS,
  UNLIKE_VIDEO_REQUEST,
  UNLIKE_VIDEO_SUCCESS,
  UNLIKE_VIDEO_FAIL,
  UPLOAD_VIDEO_FAIL,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  VIDEO_PARAMS_REQUEST,
  VIDEO_PARAMS_SUCCESS,
  VIDEO_PARAMS_FAIL,
  VIDEO_FLAG_FAIL,
  VIDEO_FLAG_REQUEST,
  VIDEO_FLAG_SUCCESS
} from '../Constants/videoConstants';



// list all videos

export const listAllVideos = () => async (dispatch) => {
  dispatch({ type: VIDEO_LIST_REQUEST });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/`);
    dispatch({ type: VIDEO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VIDEO_LIST_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


// video details

export const getVideoDetails = (videoId) => async (dispatch) => {
  dispatch({ 
    type: VIDEO_DETAILS_REQUEST,
    payload: videoId 
  });

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}`);
    dispatch({ 
      type: VIDEO_DETAILS_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({
      type: VIDEO_DETAILS_FAIL, 
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// upload Video
export const uploadVideo = (screenId, campaign) => async(dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_VIDEO_REQUEST,
      payload: (screenId, campaign)
    })

    const {userSignin: {userInfo}} = getState();

    const {data} = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/screen/${screenId}`, {userInfo, campaign}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    dispatch({
      type: UPLOAD_VIDEO_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message = 
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: UPLOAD_VIDEO_FAIL,
      payload: message,
    });
  }
}


// delete video

export const deleteVideo = (videoId) => async (dispatch, getState) => {
  dispatch({
    type: VIDEO_DELETE_REQUEST,
    payload: videoId
  });
  const { userSignin: { userInfo } } = getState();
  try {

    const { data } = await axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: VIDEO_DELETE_SUCCESS
    });
    console.log({data});


  } catch (error) {
    dispatch({
      type: VIDEO_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// like video

export const likeVideo = (videoId, interaction) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ 
      type: LIKE_VIDEO_REQUEST, 
      payload: videoId 
    });
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/likeVideo/${interaction}`, { videoId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: LIKE_VIDEO_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: LIKE_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// unlike video

export const unlikeVideo = (videoId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: UNLIKE_VIDEO_REQUEST, payload: videoId });
    const { data } = await axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/unlikeVideo`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: UNLIKE_VIDEO_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: UNLIKE_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// video flag
export const flagVideo = (videoId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: VIDEO_FLAG_REQUEST,
    payload: videoId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('video Id found')
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/flagVideo/${interaction}`, {videoId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: VIDEO_FLAG_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIDEO_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};



// view video
export const viewVideo = (videoId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: VIEWS_VIDEO_REQUEST, payload: videoId });
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/view/${videoId}`, { videoId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: VIEWS_VIDEO_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: VIEWS_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// review video
export const reviewVideo = (videoId, review) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();

  try {
    dispatch({ type: REVIEW_VIDEO_REQUEST, payload: videoId });
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/reviews`, review , {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: REVIEW_VIDEO_SUCCESS, payload: data.review, success: true });
  } catch (error) {
    dispatch({
      type: REVIEW_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// update video

export const updateVideo = (video) => async (dispatch, getState) => {
  dispatch({
    type: VIDEO_UPDATE_REQUEST,
    payload: video
  });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${video._id}`, video, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: VIDEO_UPDATE_SUCCESS, 
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VIDEO_UPDATE_FAIL,
      error: message
    });
  };
};


// get video params
export const getVideoParams = (videoId) => async (dispatch) => {
  dispatch({
    type: VIDEO_PARAMS_REQUEST,
    payload: videoId
  });
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/advertParams`);
    dispatch({
      type: VIDEO_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VIDEO_PARAMS_FAIL,
      error: message
    });
  }
}
