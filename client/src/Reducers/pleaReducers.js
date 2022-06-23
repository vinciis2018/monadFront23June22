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
  PLEA_SUMMARY_SUCCESS,
  PLEA_SUMMARY_FAIL,
} from '../Constants/pleaConstants'

export const masterRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case MASTER_REQUEST_REQUEST:
      return { loading: true };
    case MASTER_REQUEST_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case MASTER_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allyRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ALLY_REQUEST_REQUEST:
      return { loading: true };
    case ALLY_REQUEST_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case ALLY_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_REQUEST_REQUEST:
      return { loading: true };
    case BRAND_REQUEST_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case BRAND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const allPleasListReducer = (state = {allPleas: [] }, action) => {
  switch (action.type) {
    case ALL_PLEA_LIST_REQUEST:
      return { loading: true };
    case ALL_PLEA_LIST_SUCCESS:
      return { loading: false, success: true, allPleas: action.payload };
    case ALL_PLEA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pleaSummaryReducer = (state = { loading: true, summary: [] }, action) => {
  switch (action.type) {
    case PLEA_SUMMARY_REQUEST:
      return { loading: true };
    case PLEA_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case PLEA_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
