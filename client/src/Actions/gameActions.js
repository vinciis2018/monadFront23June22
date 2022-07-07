import Axios from 'axios';
import { registerGame, readContract } from 'ratCodes/ratTrap';
import { 
  CREATE_SCREEN_GAME_FAIL,
  CREATE_SCREEN_GAME_REQUEST, 
  CREATE_SCREEN_GAME_SUCCESS,
  DETAILS_SCREEN_GAME_FAIL,
  DETAILS_SCREEN_GAME_REQUEST,
  DETAILS_SCREEN_GAME_SUCCESS, 
  PLAY_SCREEN_GAME_FAIL, 
  PLAY_SCREEN_GAME_REQUEST, 
  PLAY_SCREEN_GAME_SUCCESS, 
  REMOVE_SCREEN_GAME_FAIL, 
  REMOVE_SCREEN_GAME_REQUEST,
  REMOVE_SCREEN_GAME_SUCCESS,
  CREATE_ADVERT_GAME_FAIL,
  CREATE_ADVERT_GAME_REQUEST,
  CREATE_ADVERT_GAME_SUCCESS,
  DETAILS_ADVERT_GAME_FAIL,
  DETAILS_ADVERT_GAME_REQUEST,
  DETAILS_ADVERT_GAME_SUCCESS,
  REMOVE_ADVERT_GAME_FAIL,
  REMOVE_ADVERT_GAME_REQUEST,
  REMOVE_ADVERT_GAME_SUCCESS,
  PLAY_ADVERT_GAME_FAIL,
  PLAY_ADVERT_GAME_REQUEST,
  PLAY_ADVERT_GAME_SUCCESS,

} from "../Constants/gameConstants"

// create screen game
export const createScreenGame = (screenId, gameData) => async (dispatch, getState) => {
    
 
  dispatch({
    type: CREATE_SCREEN_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();
  try {

    console.log("starting now")


    const gameParams = {
      slotTimePeriod : gameData.slotsTimePeriod,
      initialRent : gameData.rentPerSlot,
      initialWorth : gameData.screenWorth,
      pools : {
        EPs : 0,
        EPa : 0,
        likeEP : 0,
        flagEP : 0 
      }
    }

    const game = { gameData, gameParams}
    const dataGame = await registerGame({walletAddress: gameData.walletAddress, data: game});
    console.log(dataGame)


    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/screen/${screenId}/createScreenGame`, dataGame, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    
    dispatch({
      type: CREATE_SCREEN_GAME_SUCCESS,
      payload: data
    })

  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_SCREEN_GAME_FAIL,
      payload: message
    })
  }
}

// get screen game details;
export const getScreenGameDetails = ({activeGame}) => async (dispatch, getState) => {
  dispatch({
    type: DETAILS_SCREEN_GAME_REQUEST,
    payload: activeGame
  })
  console.log(activeGame)
  try {
    const data = await readContract(activeGame)
    // const {data} = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/screen/${screenId}/gameDetails`);
    dispatch({
      type: DETAILS_SCREEN_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_SCREEN_GAME_FAIL,
      payload: message
    })
  }
}

// remove screen game
export const removeScreenGame = (screenId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_SCREEN_GAME_REQUEST,
    payload: gameData
  });
  const {userSignin: {userInfo}} = getState();
  try {

    const game = { gameData }
    const dataGame = await registerGame({walletAddress: gameData.walletAddress, data: game});
    console.log(dataGame)

    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/screen/${screenId}/removeScreenGame`, dataGame, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_SCREEN_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_SCREEN_GAME_FAIL, 
      payload: message 
    });
  }
}


// play screen games
export const playScreenGames = (screenId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_SCREEN_GAME_REQUEST,
    payload: screenId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/screen/${screenId}/playScreenGame/${interaction}`, {screenId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_SCREEN_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_SCREEN_GAME_FAIL, 
    payload: message 
  });
  }
}

// create advert game
export const createAdvertGame = (videoId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ADVERT_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    
    console.log("starting now")

    const gameParams = {
      expectedViews : gameData.expectedViews,
      initialBudget : gameData.adBudget,
      initialWorth : gameData.adWorth,
      pools : {
        EPb: gameData.adBudget,
        likeEP : 0,
        flagEP : 0 
      }
    }

    const game = { gameData, gameParams}

    const dataGame = await registerGame({walletAddress: gameData.walletAddress, data: game});
    console.log(dataGame)

    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/video/${videoId}/createAdvertGame`, dataGame, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_ADVERT_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_ADVERT_GAME_FAIL,
      payload: message
    })
  }
}

// advert game details
export const getAdvertGameDetails = (videoId) => async (dispatch) => {
  dispatch({
    type: DETAILS_ADVERT_GAME_REQUEST,
    payload: videoId
  })
  try {
    const {data} = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/video/${videoId}/gameDetails`);
    dispatch({
      type: DETAILS_ADVERT_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_ADVERT_GAME_FAIL,
      payload: message
    })
  }
}

// remove advert game
export const removeAdvertGame = (videoId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ADVERT_GAME_REQUEST,
    payload: videoId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/video/${videoId}/removeAdvertGame`, videoId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_ADVERT_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_ADVERT_GAME_FAIL, 
      payload: message 
    });
  }
}

// play advert games
export const playAdvertGames = (videoId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_ADVERT_GAME_REQUEST,
    payload: videoId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/game/video/${videoId}/playAdvertGame/${interaction}`, {videoId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_ADVERT_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_ADVERT_GAME_FAIL, 
    payload: message 
  });
  }
}


