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
  CREATE_ASSET_GAME_FAIL,
  CREATE_ASSET_GAME_REQUEST,
  CREATE_ASSET_GAME_SUCCESS,
  DETAILS_ASSET_GAME_FAIL,
  DETAILS_ASSET_GAME_REQUEST,
  DETAILS_ASSET_GAME_SUCCESS,
  PLAY_ASSET_GAME_FAIL,
  PLAY_ASSET_GAME_REQUEST,
  PLAY_ASSET_GAME_SUCCESS,
  REMOVE_ASSET_GAME_FAIL,
  REMOVE_ASSET_GAME_REQUEST,
  REMOVE_ASSET_GAME_SUCCESS,
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
  CREATE_CHANNEL_GAME_FAIL,
  CREATE_CHANNEL_GAME_REQUEST,
  CREATE_CHANNEL_GAME_SUCCESS,
  DETAILS_CHANNEL_GAME_FAIL,
  DETAILS_CHANNEL_GAME_REQUEST,
  DETAILS_CHANNEL_GAME_SUCCESS,
  PLAY_CHANNEL_GAME_FAIL,
  PLAY_CHANNEL_GAME_REQUEST,
  PLAY_CHANNEL_GAME_SUCCESS,
  REMOVE_CHANNEL_GAME_FAIL,
  REMOVE_CHANNEL_GAME_REQUEST,
  REMOVE_CHANNEL_GAME_SUCCESS,
  CREATE_FILM_GAME_FAIL,
  CREATE_FILM_GAME_REQUEST,
  CREATE_FILM_GAME_SUCCESS,
  DETAILS_FILM_GAME_FAIL,
  DETAILS_FILM_GAME_REQUEST,
  DETAILS_FILM_GAME_SUCCESS,
  REMOVE_FILM_GAME_FAIL,
  REMOVE_FILM_GAME_REQUEST,
  REMOVE_FILM_GAME_SUCCESS,
  PLAY_FILM_GAME_FAIL,
  PLAY_FILM_GAME_REQUEST,
  PLAY_FILM_GAME_SUCCESS,
  CREATE_SHOP_GAME_FAIL,
  CREATE_SHOP_GAME_REQUEST,
  CREATE_SHOP_GAME_SUCCESS,
  DETAILS_SHOP_GAME_FAIL,
  DETAILS_SHOP_GAME_REQUEST,
  DETAILS_SHOP_GAME_SUCCESS,
  PLAY_SHOP_GAME_FAIL,
  PLAY_SHOP_GAME_REQUEST,
  PLAY_SHOP_GAME_SUCCESS,
  REMOVE_SHOP_GAME_FAIL,
  REMOVE_SHOP_GAME_REQUEST,
  REMOVE_SHOP_GAME_SUCCESS,
  CREATE_ITEM_GAME_FAIL,
  CREATE_ITEM_GAME_REQUEST,
  CREATE_ITEM_GAME_SUCCESS,
  DETAILS_ITEM_GAME_FAIL,
  DETAILS_ITEM_GAME_REQUEST,
  DETAILS_ITEM_GAME_SUCCESS,
  REMOVE_ITEM_GAME_FAIL,
  REMOVE_ITEM_GAME_REQUEST,
  REMOVE_ITEM_GAME_SUCCESS,
  PLAY_ITEM_GAME_FAIL,
  PLAY_ITEM_GAME_REQUEST,
  PLAY_ITEM_GAME_SUCCESS,
} from "../Constants/gameConstants";

// screem
export const screenGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_SCREEN_GAME_REQUEST:
      return { loading: true };
    case CREATE_SCREEN_GAME_SUCCESS:
      return { loading: false, success: true, screenGame: action.payload };
    case CREATE_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const screenGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_SCREEN_GAME_REQUEST:
      return { loading: true };
    case DETAILS_SCREEN_GAME_SUCCESS:
      return {loading: false, screenGameData: action.payload };
    case DETAILS_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const screenGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_SCREEN_GAME_REQUEST:
      return { loading: true };
    case REMOVE_SCREEN_GAME_SUCCESS:
      return { loading: false, success: true, calender: action.payload };
    case REMOVE_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const screenGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_SCREEN_GAME_REQUEST:
      return { loading: true };
    case PLAY_SCREEN_GAME_SUCCESS:
      return { loading: false, success: true, playedScreenGame: action.payload };
    case PLAY_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// asset
export const assetGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_ASSET_GAME_REQUEST:
      return { loading: true };
    case CREATE_ASSET_GAME_SUCCESS:
      return { loading: false, success: true, assetGame: action.payload };
    case CREATE_ASSET_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const assetGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_ASSET_GAME_REQUEST:
      return { loading: true };
    case DETAILS_ASSET_GAME_SUCCESS:
      return {loading: false, assetGameData: action.payload };
    case DETAILS_ASSET_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const assetGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_ASSET_GAME_REQUEST:
      return { loading: true };
    case REMOVE_ASSET_GAME_SUCCESS:
      return { loading: false, success: true, screen: action.payload };
    case REMOVE_ASSET_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const assetGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_ASSET_GAME_REQUEST:
      return { loading: true };
    case PLAY_ASSET_GAME_SUCCESS:
      return { loading: false, success: true, playedAssetGame: action.payload };
    case PLAY_ASSET_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// advert
export const advertGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_ADVERT_GAME_REQUEST:
      return { loading: true };
    case CREATE_ADVERT_GAME_SUCCESS:
      return { loading: false, success: true, advertGame: action.payload };
    case CREATE_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const advertGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_ADVERT_GAME_REQUEST:
      return { loading: true };
    case DETAILS_ADVERT_GAME_SUCCESS:
      return {loading: false, advertGameData: action.payload };
    case DETAILS_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const advertGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_ADVERT_GAME_REQUEST:
      return { loading: true };
    case REMOVE_ADVERT_GAME_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case REMOVE_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const advertGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_ADVERT_GAME_REQUEST:
      return { loading: true };
    case PLAY_ADVERT_GAME_SUCCESS:
      return { loading: false, success: true, playedAdvertGame: action.payload };
    case PLAY_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// channel
export const channelGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_CHANNEL_GAME_REQUEST:
      return { loading: true };
    case CREATE_CHANNEL_GAME_SUCCESS:
      return { loading: false, success: true, channelGame: action.payload };
    case CREATE_CHANNEL_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const channelGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_CHANNEL_GAME_REQUEST:
      return { loading: true };
    case DETAILS_CHANNEL_GAME_SUCCESS:
      return {loading: false, channelGameData: action.payload };
    case DETAILS_CHANNEL_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const channelGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_CHANNEL_GAME_REQUEST:
      return { loading: true };
    case REMOVE_CHANNEL_GAME_SUCCESS:
      return { loading: false, success: true, screen: action.payload };
    case REMOVE_CHANNEL_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const channelGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_CHANNEL_GAME_REQUEST:
      return { loading: true };
    case PLAY_CHANNEL_GAME_SUCCESS:
      return { loading: false, success: true, playedChannelGame: action.payload };
    case PLAY_CHANNEL_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// film
export const filmGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_FILM_GAME_REQUEST:
      return { loading: true };
    case CREATE_FILM_GAME_SUCCESS:
      return { loading: false, success: true, filmGame: action.payload };
    case CREATE_FILM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const filmGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_FILM_GAME_REQUEST:
      return { loading: true };
    case DETAILS_FILM_GAME_SUCCESS:
      return {loading: false, filmGameData: action.payload };
    case DETAILS_FILM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const filmGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_FILM_GAME_REQUEST:
      return { loading: true };
    case REMOVE_FILM_GAME_SUCCESS:
      return { loading: false, success: true, film: action.payload };
    case REMOVE_FILM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const filmGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_FILM_GAME_REQUEST:
      return { loading: true };
    case PLAY_FILM_GAME_SUCCESS:
      return { loading: false, success: true, playedFilmGame: action.payload };
    case PLAY_FILM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// shop
export const shopGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_SHOP_GAME_REQUEST:
      return { loading: true };
    case CREATE_SHOP_GAME_SUCCESS:
      return { loading: false, success: true, shopGame: action.payload };
    case CREATE_SHOP_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const shopGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_SHOP_GAME_REQUEST:
      return { loading: true };
    case DETAILS_SHOP_GAME_SUCCESS:
      return {loading: false, shopGameData: action.payload };
    case DETAILS_SHOP_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const shopGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_SHOP_GAME_REQUEST:
      return { loading: true };
    case REMOVE_SHOP_GAME_SUCCESS:
      return { loading: false, success: true, shop: action.payload };
    case REMOVE_SHOP_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const shopGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_SHOP_GAME_REQUEST:
      return { loading: true };
    case PLAY_SHOP_GAME_SUCCESS:
      return { loading: false, success: true, playedShopGame: action.payload };
    case PLAY_SHOP_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// item
export const itemGameCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_ITEM_GAME_REQUEST:
      return { loading: true };
    case CREATE_ITEM_GAME_SUCCESS:
      return { loading: false, success: true, itemGame: action.payload };
    case CREATE_ITEM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const itemGameDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case DETAILS_ITEM_GAME_REQUEST:
      return { loading: true };
    case DETAILS_ITEM_GAME_SUCCESS:
      return {loading: false, itemGameData: action.payload };
    case DETAILS_ITEM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const itemGameRemoveReducer = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_ITEM_GAME_REQUEST:
      return { loading: true };
    case REMOVE_ITEM_GAME_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case REMOVE_ITEM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const itemGamePlayReducer = (state = {loading: true}, action) => {
  switch(action.type) {
    case PLAY_ITEM_GAME_REQUEST:
      return { loading: true };
    case PLAY_ITEM_GAME_SUCCESS:
      return { loading: false, success: true, playedItemGame: action.payload };
    case PLAY_ITEM_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}