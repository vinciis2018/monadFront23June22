import { 
  PIN_ADD_FAIL,
  PIN_ADD_REQUEST,
  PIN_ADD_RESET,
  PIN_ADD_SUCCESS,
  PIN_UPDATE_FAIL,
  PIN_UPDATE_SUCCESS,
  PIN_UPDATE_REQUEST,
  PIN_UPDATE_RESET,
  PIN_GET_FAIL,
  PIN_GET_REQUEST, 
  PIN_GET_SUCCESS,
  PINS_GET_FAIL,
  PINS_GET_REQUEST, 
  PINS_GET_SUCCESS,
  ALL_PINS_GET_FAIL,
  ALL_PINS_GET_REQUEST, 
  ALL_PINS_GET_SUCCESS    
} from "../Constants/pinConstants";

export const pinsGetReducer = (state = { loading: true, allPins: []}, action) => {
  switch(action.type) {
    case PINS_GET_REQUEST:
    return { loading: true };
    case PINS_GET_SUCCESS:
      return { loading: false, allPins: action.payload};
    case PINS_GET_FAIL:
      return { loading: false, error: action.payload}
    default:
      return state;
  }
}

export const jsonPinsReducer = (state = { loading: true, jsonData: {}}, action) => {
  switch(action.type) {
    case ALL_PINS_GET_REQUEST:
    return { loading: true };
    case ALL_PINS_GET_SUCCESS:
      return { loading: false, jsonData: action.payload};
    case ALL_PINS_GET_FAIL:
      return { loading: false, error: action.payload}
    default:
      return state;
  }
}

export const pinDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PIN_GET_REQUEST:
      return { loading: true };
    case PIN_GET_SUCCESS:
      return { loading: false, pin: action.payload };
    case PIN_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const pinAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PIN_ADD_REQUEST:
      return { loading: true };
    case PIN_ADD_SUCCESS:
      return { loading: false, success: true, pinAdded: action.payload };
    case PIN_ADD_FAIL:
      return { loading: false, error: action.payload };
    case PIN_ADD_RESET:
      return {};
    default:
      return state;
  }
}

export const pinUpdateReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case PIN_UPDATE_REQUEST:
      return { loading: true };
    case PIN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}