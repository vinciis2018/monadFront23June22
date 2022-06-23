import Axios from 'axios';
import { 
  MASTER_REQUEST_REQUEST,
  MASTER_REQUEST_SUCCESS,
  MASTER_REQUEST_FAIL,
  ALLY_REQUEST_REQUEST,
  ALLY_REQUEST_SUCCESS,
  ALLY_REQUEST_FAIL,
  BRAND_REQUEST_REQUEST,
  BRAND_REQUEST_SUCCESS,
  BRAND_REQUEST_FAIL,
  ALL_PLEA_LIST_REQUEST,
  ALL_PLEA_LIST_SUCCESS,
  ALL_PLEA_LIST_FAIL,
  PLEA_SUMMARY_REQUEST,
  PLEA_SUMMARY_FAIL,
  PLEA_SUMMARY_SUCCESS,
} from '../Constants/pleaConstants';

export const masterRequest = (plea) => async (dispatch, getState) => {
  dispatch({
    type: MASTER_REQUEST_REQUEST,
    payload: plea
  });
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/access`, plea, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: MASTER_REQUEST_SUCCESS,
      payload: data.plea
    });
  } catch (error) {
    dispatch({
      type: MASTER_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const allyRequest = (plea) => async (dispatch, getState) => {
  dispatch({
    type: ALLY_REQUEST_REQUEST,
    payload: plea
  });
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/access`, plea, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ALLY_REQUEST_SUCCESS,
      payload: data.plea
    });
  } catch (error) {
    dispatch({
      type: ALLY_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const brandRequest = (plea) => async (dispatch, getState) => {
  dispatch({
    type: BRAND_REQUEST_REQUEST,
    payload: plea
  });
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/access`, plea, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: BRAND_REQUEST_SUCCESS,
      payload: data.plea
    });
  } catch (error) {
    dispatch({
      type: BRAND_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listAllPleas = () => async (dispatch, getState) => {
  dispatch({
    type: ALL_PLEA_LIST_REQUEST
  });

  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/allPleas`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: ALL_PLEA_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PLEA_LIST_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const summaryPlea = () => async(dispatch, getState) => {
  dispatch({
    type: PLEA_SUMMARY_REQUEST
  });

  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/summary`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: PLEA_SUMMARY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PLEA_SUMMARY_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}