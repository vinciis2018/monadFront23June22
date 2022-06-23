import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
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
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_ASSETS_FAIL,
  USER_ASSETS_REQUEST,
  USER_ASSETS_SUCCESS,
  USER_SCREENS_FAIL,
  USER_SCREENS_REQUEST,
  USER_SCREENS_SUCCESS,
  USER_VIDEOS_FAIL,
  USER_VIDEOS_REQUEST,
  USER_VIDEOS_SUCCESS,
  USER_TOPALLIES_LIST_REQUEST,
  USER_TOPALLIES_LIST_SUCCESS,
  USER_TOPALLIES_LIST_FAIL,
  USER_CHANNELS_REQUEST,
  USER_CHANNELS_SUCCESS,
  USER_CHANNELS_FAIL,
  USER_FILMS_REQUEST,
  USER_FILMS_SUCCESS,
  USER_FILMS_FAIL,
  USER_TOPBRANDS_LIST_REQUEST,
  USER_TOPBRANDS_LIST_SUCCESS,
  USER_TOPBRANDS_LIST_FAIL,
  USER_SHOPS_FAIL,
  USER_SHOPS_REQUEST,
  USER_SHOPS_SUCCESS,
  USER_ITEMS_REQUEST,
  USER_ITEMS_SUCCESS,
  USER_ITEMS_FAIL
} from "../Constants/userConstants"
import { useFinnie } from '../components/finnie';



// SIGNUP

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { name, email, password }
  });
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/signup`, { name, email, password });
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



// SIGNIN

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password }
  });
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/signin`, { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log(data)
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// SIGNOUT

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('wallet');
  
  dispatch({
    type: USER_SIGNOUT
  });
  // document.location.href ='/signin';
};

// USERDETAILS

export const detailsUser = ({userId, walletAddress}) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
    payload: userId
  });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userInfo._id}/${walletAddress}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message
    })
  }
};


// USERPROFILE UPDATE

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: user
  });
  const { userSignin: { userInfo }} = getState();
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/profile`, user, {
      headers : { 
        Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message 
    });
  }
};

// Upadate user

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: user
  });
  const { userSignin : { userInfo } } = getState();
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message 
    });
  }
};

// list users

export const listUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST
  });
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_LIST_FAIL,
      payload: message 
    });
  }
};

// delete Users

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_REQUEST,
    payload: userId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch ({
      type: USER_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message 
    });
  }
};

// list top masters

export const listTopMasters = () => async (dispatch) => {
  dispatch({
    type: USER_TOPMASTERS_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/top-masters`);
    dispatch({
      type: USER_TOPMASTERS_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_TOPMASTERS_LIST_FAIL,
      payload: message 
    });
  }
}


// list top allies

export const listTopAllies = () => async (dispatch) => {
  dispatch({
    type: USER_TOPALLIES_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/top-allies`);
    dispatch({
      type: USER_TOPALLIES_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_TOPALLIES_LIST_FAIL,
      payload: message 
    });
  }
}

// list top brand

export const listTopBrands = () => async (dispatch) => {
  dispatch({
    type: USER_TOPBRANDS_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/top-brands`);
    dispatch({
      type: USER_TOPBRANDS_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_TOPBRANDS_LIST_FAIL,
      payload: message 
    });
  }
}


// get user asset list
export const userAssetsList = (userId) => async (dispatch, getState) => {
  console.log("trying user assets list");
  try {
    dispatch({ type: USER_ASSETS_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log({userId});
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}/myAssets`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_ASSETS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_ASSETS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// get user screen list
export const userScreensList = (user) => async (dispatch, getState) => {
  console.log("trying user screens list");
  try {
    dispatch({ type: USER_SCREENS_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${user._id}/${user.defaultWallet}/myScreens`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_SCREENS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_SCREENS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};



// get user videolist
export const userVideosList = (user) => async (dispatch, getState) => {
  console.log("trying user video list");
  try {
    dispatch({ type: USER_VIDEOS_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log(user)
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${user._id}/${user.defaultWallet}/myVideos`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_VIDEOS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_VIDEOS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// get user channel list
export const userChannelsList = (userId) => async (dispatch, getState) => {
  console.log("trying user channels list");
  try {
    dispatch({ type: USER_CHANNELS_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log({userId});
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}/myChannels`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_CHANNELS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_CHANNELS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// get user filmlist
export const userFilmsList = (userId) => async (dispatch, getState) => {
  console.log("trying user film list");
  try {
    dispatch({ type: USER_FILMS_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log({userId});
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}/myFilms`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_FILMS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_FILMS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// get user shop list
export const userShopsList = (userId) => async (dispatch, getState) => {
  console.log("trying user shops list");
  try {
    dispatch({ type: USER_SHOPS_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log({userId});
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}/myShops`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_SHOPS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_SHOPS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// get user itemlist
export const userItemsList = (userId) => async (dispatch, getState) => {
  console.log("trying user item list");
  try {
    dispatch({ type: USER_ITEMS_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
      console.log({userId});
      const { data } = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}/myItems`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_ITEMS_SUCCESS, payload: data })
    } else {
      return console.log("no user found");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_ITEMS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


