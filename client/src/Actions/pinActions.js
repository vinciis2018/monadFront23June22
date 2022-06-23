import axios from 'axios';
import { 
  PIN_ADD_FAIL,
  PIN_ADD_REQUEST,
  PIN_ADD_SUCCESS,
  PIN_UPDATE_SUCCESS,
  PIN_UPDATE_REQUEST,
  PIN_UPDATE_FAIL,
  PIN_GET_FAIL,
  PIN_GET_REQUEST, 
  PIN_GET_SUCCESS,
  PINS_GET_FAIL,
  PINS_GET_REQUEST, 
  PINS_GET_SUCCESS,
  ALL_PINS_GET_FAIL,
  ALL_PINS_GET_REQUEST, 
  ALL_PINS_GET_SUCCESS  
} from '../Constants/pinConstants';



export const getAllPins = () => async(dispatch) => {
  dispatch({
    type: PINS_GET_REQUEST,
  })
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/pins`);
    dispatch({
      type: PINS_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: PINS_GET_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}


export const getPinJson = () => async (dispatch) => {
  dispatch({
    type: ALL_PINS_GET_REQUEST,
  });

  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/pins/allPinGeoJson`);
    dispatch({
      type: ALL_PINS_GET_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ALL_PINS_GET_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}


export const getPinDetails = (pinId) => {
  return async (dispatch) => {
    dispatch({
      type: PIN_GET_REQUEST,
    });
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${pinId}`);
      dispatch({
        type: PIN_GET_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: PIN_GET_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      })
    }
  }
} 


export const addPins = (category, lat, lon) => async(dispatch, getState) => {
  dispatch({
    type: PIN_ADD_REQUEST,
    payload: category, lat, lon

  })
  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/pins`, {category, lat, lon}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PIN_ADD_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PIN_ADD_FAIL,
      payload: message
    });
  }
}



export const updatePin = (screenId, pin) => async (dispatch, getState) => {
  dispatch({
    type: PIN_UPDATE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const {data} = await axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${screenId}`, pin, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    dispatch({
      type: PIN_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    
    dispatch({
      type: PIN_UPDATE_FAIL,
      error: message
    });
  }
};
