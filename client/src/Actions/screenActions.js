import Axios from 'axios';
import { gameInteraction } from 'ratCodes/ratTrap';

import {
  SCREEN_ALLY_PLEA_FAIL,
  SCREEN_ALLY_PLEA_REQUEST,
  SCREEN_ALLY_PLEA_SUCCESS,
  SCREEN_ALLY_GRANT_FAIL,
  SCREEN_ALLY_GRANT_REQUEST,
  SCREEN_ALLY_GRANT_SUCCESS,
  SCREEN_ALLY_REJECT_FAIL,
  SCREEN_ALLY_REJECT_REQUEST,
  SCREEN_ALLY_REJECT_SUCCESS,
  SCREEN_CATEGORY_LIST_FAIL,
  SCREEN_CATEGORY_LIST_REQUEST,
  SCREEN_CATEGORY_LIST_SUCCESS,
  SCREEN_CREATE_FAIL,
  SCREEN_CREATE_REQUEST,
  SCREEN_CREATE_SUCCESS,
  SCREEN_DELETE_FAIL,
  SCREEN_DELETE_REQUEST,
  SCREEN_DELETE_SUCCESS,
  SCREEN_DETAILS_FAIL,
  SCREEN_DETAILS_REQUEST,
  SCREEN_DETAILS_SUCCESS,
  SCREEN_PIN_DETAILS_FAIL,
  SCREEN_PIN_DETAILS_REQUEST,
  SCREEN_PIN_DETAILS_SUCCESS,
  SCREEN_FLAG_FAIL,
  SCREEN_FLAG_REQUEST,
  SCREEN_FLAG_SUCCESS,
  SCREEN_LIKE_FAIL,
  SCREEN_LIKE_REQUEST,
  SCREEN_LIKE_SUCCESS,
  SCREEN_LIST_FAIL,
  SCREEN_LIST_REQUEST,
  SCREEN_LIST_SUCCESS,
  SCREEN_LOCATION_SAVE,
  SCREEN_REVIEW_CREATE_FAIL,
  SCREEN_REVIEW_CREATE_REQUEST,
  SCREEN_REVIEW_CREATE_SUCCESS,
  SCREEN_SUBSCRIBE_FAIL,
  SCREEN_SUBSCRIBE_REQUEST,
  SCREEN_SUBSCRIBE_SUCCESS,
  SCREEN_UNLIKE_FAIL,
  SCREEN_UNLIKE_REQUEST,
  SCREEN_UNLIKE_SUCCESS,
  SCREEN_UNSUBSCRIBE_FAIL,
  SCREEN_UNSUBSCRIBE_REQUEST,
  SCREEN_UNSUBSCRIBE_SUCCESS,
  SCREEN_UPDATE_FAIL,
  SCREEN_UPDATE_REQUEST,
  SCREEN_UPDATE_SUCCESS,
  SCREEN_VIDEOS_FAIL,
  SCREEN_VIDEOS_REQUEST,
  SCREEN_VIDEOS_SUCCESS,
  SCREEN_VIDEO_DELETE_FAIL,
  SCREEN_VIDEO_DELETE_REQUEST,
  SCREEN_VIDEO_DELETE_SUCCESS,
  SCREEN_VIDEO_UPLOAD_FAIL,
  SCREEN_VIDEO_UPLOAD_REQUEST,
  SCREEN_VIDEO_UPLOAD_SUCCESS,
  SCREEN_PARAMS_FAIL,
  SCREEN_PARAMS_SUCCESS,
  SCREEN_PARAMS_REQUEST,
} from '../Constants/screenConstants';


// // list top screens

// export const listTopMasters = () => async (dispatch) => {
//   dispatch({
//     type: TOPSCREENS_LIST_REQUEST,
//   });
//   try {
//     const { data } = await axios.get('/api/users/top-masters');
//     dispatch({
//       type: TOPSCREENS_LIST_SUCCESS,
//       payload: data
//     })
//   } catch (error) {
//     const message =
//     error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message;
//     dispatch({
//       type: TOPSCREENS_LIST_FAIL,
//       payload: message 
//     });
//   }
// }


//screen list 

export const listScreens = ({
  pageNumber = '',
  master = '',
  name = '',
  screenCategory = '',
  request = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: SCREEN_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/?pageNumber=${pageNumber}&master=${master}&name=${name}&category=${screenCategory}&min=${min}&max=${max}&rating=${rating}&request=${request}`);
    dispatch({
      type: SCREEN_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_LIST_FAIL,
      payload: error.message
    });
  }
};

// screen categories

export const listScreenCategories = () => async (dispatch) => {
  dispatch({
    type: SCREEN_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/categories`);
    dispatch({
      type: SCREEN_CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// screen details

export const detailsScreen = (screenId) => async (dispatch) => {
  dispatch({ 
    type: SCREEN_DETAILS_REQUEST, 
    payload: screenId 
  });
  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`);
    dispatch({
      type: SCREEN_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// screen pin details
export const getScreenPinDetails = (screenId) => async (dispatch) => {
  dispatch({
    type: SCREEN_PIN_DETAILS_REQUEST,
    payload: screenId
  });
  try {
    const {data} = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/pin`);
    dispatch({
      type: SCREEN_PIN_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_PIN_DETAILS_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
}

// screen create

export const createScreen = () => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens`, {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: SCREEN_CREATE_SUCCESS,
      payload: data.screen
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SCREEN_CREATE_FAIL,
      payload: message
    });
  }
};

// screen Edit

export const updateScreen = (screen) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_UPDATE_REQUEST,
    payload: screen
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screen._id}`, screen,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: SCREEN_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SCREEN_UPDATE_FAIL,
      error: message
    });
  }
};

// screen delete

export const deleteScreen = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_DELETE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: SCREEN_DELETE_SUCCESS });
    console.log({data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SCREEN_DELETE_FAIL,
      payload: message
    });
  }
};

// screen review create

export const createReview = (screenId, review) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_REVIEW_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: SCREEN_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SCREEN_REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};


// screen video list

export const screenVideosList = (screenId) => async (dispatch, getState) => {
  dispatch({ type: SCREEN_VIDEOS_REQUEST, payload: screenId });
  const { userSignin: { userInfo } } = getState();
  console.log("screen video list found");

  try {
    // const {data} = await Axios.get(`http://localhost:3333/api/screens/${screenId}/screenVideos`, {

    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/screenVideos`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: SCREEN_VIDEOS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCREEN_VIDEOS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// upload video screen 

export const screenVideoUpload = (screenId, video) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCREEN_VIDEO_UPLOAD_REQUEST,
      payload: video
    });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/uploadVideo`, video, {
        headers: { 
          Authorization: `Bearer ${userInfo.token}` 
        },
      }
    )
    dispatch({ 
      type: SCREEN_VIDEO_UPLOAD_SUCCESS, 
      payload: data.video 
    });

  } catch (error) {
    dispatch({
      type: SCREEN_VIDEO_UPLOAD_FAIL, 
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

};


// delete video screen

export const deleteScreenVideo = (videoId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_VIDEO_DELETE_REQUEST,
    payload: videoId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const {data} = await Axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${videoId}/deleteVideo`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: SCREEN_VIDEO_DELETE_SUCCESS,
      success: true,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: SCREEN_VIDEO_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}


// screen like
export const likeScreen = (screenId, interactionData) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_LIKE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();

  if(!interactionData.calender.activeGameContract) {

    dispatch({
      type: SCREEN_LIKE_FAIL,
      payload: 'No game contract found, contact master'
    });
    return;

  } else if(interactionData.screen.master === userInfo.defaultWallet) {

    dispatch({
      type: SCREEN_LIKE_FAIL,
      payload: 'You cannot like your own screen'
    });
    return;

  } else {
    try {
      console.log("screen:", interactionData)
  
      const dataGame = await gameInteraction({walletAddress: userInfo.defaultWallet, data: interactionData});
      console.log(dataGame)
      // const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId.screenId}/likeScreen/${screenId.interaction}`, {screenId}, {
      //   headers:
      //     { Authorization: `Bearer ${userInfo.token}` }
      // });
      // dispatch({ 
      //   type: SCREEN_LIKE_SUCCESS, 
      //   payload: data
      //  })
    } catch (error) {
      console.log(error);
      dispatch({
        type: SCREEN_LIKE_FAIL, payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      });
    }
  }
};


// screen unlike

export const unlikeScreen = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_UNLIKE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId.screenId}/unlikeScreen`, {screenId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ 
      type: SCREEN_UNLIKE_SUCCESS, 
      payload: data
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCREEN_UNLIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// screen flag
export const flagScreen = (screenId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_FLAG_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('screen Id found')
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId.screenId}/flagScreen/${screenId.interaction}`, {screenId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ 
      type: SCREEN_FLAG_SUCCESS, 
      payload: data
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCREEN_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// screen subscribe
export const subscribeScreen = (screenId, dateHere) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_SUBSCRIBE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('screen Id found')
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId.screenId}/subscribeScreen/${screenId.interaction}`, {screenId, dateHere}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ 
      type: SCREEN_SUBSCRIBE_SUCCESS, 
      payload: data
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCREEN_SUBSCRIBE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// screen unsubscribe

export const unsubscribeScreen = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_UNSUBSCRIBE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('screen Id found')
  try {
    const { data } = await Axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId.screenId}/unsubscribeScreen`, {screenId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ 
      type: SCREEN_UNSUBSCRIBE_SUCCESS, 
      payload: data
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCREEN_UNSUBSCRIBE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};



// create plea screen

export const applyScreenAllyPlea = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_ALLY_PLEA_REQUEST,
    payload: screenId, 
  });
  const { userSignin: { userInfo } } = getState();

  try {
      const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/allyPlea/ally`, {screenId}, {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      }
      );
      dispatch({
        type: SCREEN_ALLY_PLEA_SUCCESS,
        payload: data.plea
      });
  } catch(error) {
    dispatch({
      type: SCREEN_ALLY_PLEA_FAIL,
      payload: 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// grant ally ple
export const grantScreenAllyPlea = (pleaId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_ALLY_GRANT_REQUEST,
    payload: pleaId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${pleaId}/allyPlea/master`, {pleaId}, {
      headers: { Authorization: 'Bearer ' + userInfo.token },
    }
    );
    dispatch({
      type: SCREEN_ALLY_GRANT_SUCCESS,
      payload: data.plea
    });
  } catch (error) {
    dispatch({
      type: SCREEN_ALLY_GRANT_FAIL,
      payload: 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

// reject ally plea
export const rejectScreenAllyPlea = (pleaId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_ALLY_REJECT_REQUEST,
    payload: pleaId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    // const {data} = await Axios.put(`http://localhost:3333/api/screens/${pleaId}/allyPlea/reject`, {pleaId}, {
    const {data} = await Axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${pleaId}/allyPlea/reject`, {pleaId}, {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` 
      },
    });

    dispatch({
      type: SCREEN_ALLY_REJECT_SUCCESS,
      payload: data.plea
    })
  } catch (error) {
    dispatch({
      type: SCREEN_ALLY_REJECT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

// screen params
export const getScreenParams = (screenId) => async (dispatch) => {
  dispatch({
    type: SCREEN_PARAMS_REQUEST,
    payload: screenId
  });
  // console.log(time)
  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/screenParams`);
    dispatch({
      type: SCREEN_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_PARAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}


// screenLocation 
export const saveScreenLocation = (data) => (dispatch) => {
  dispatch({ type: SCREEN_LOCATION_SAVE, payload: data });
  localStorage.setItem('screenlocation', JSON.stringify(data));
};