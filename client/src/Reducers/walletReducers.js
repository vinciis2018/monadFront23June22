import { 
  WALLET_CREATE_FAIL,
  WALLET_CREATE_RESET, 
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS, 
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_DETAILS_FAIL,
  WALLET_LIST_REQUEST,
  WALLET_LIST_SUCCESS,
  WALLET_LIST_FAIL,
  WALLET_EDIT_SUCCESS,
  WALLET_EDIT_FAIL,
  WALLET_EDIT_REQUEST,
  WALLET_EDIT_RESET,
  TOKENS_TRANSFER_REQUEST,
  TOKENS_TRANSFER_SUCCESS,
  TOKENS_TRANSFER_FAIL,
  TOKENS_TRANSFER_RESET,
  USER_ATOMIC_NFT_UPLOAD_REQUEST,
  USER_ATOMIC_NFT_UPLOAD_SUCCESS,
  USER_ATOMIC_NFT_UPLOAD_FAIL,
  USER_ATOMIC_NFT_UPLOAD_RESET,

} from "../Constants/walletConstants";


export function walletCreateReducer(state = {}, action){
  switch (action.type) {
    case WALLET_CREATE_REQUEST:
      return { loading: true };
    case WALLET_CREATE_SUCCESS:
      return { loading: false, success: true, createdWalletData: action.payload };
    case WALLET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


export function walletListReducer(state = {loading: true, wallets: []}, action) {
  switch (action.type) {
    case WALLET_LIST_REQUEST:
      return { loading: true };
    case WALLET_LIST_SUCCESS:
      return {loading: false, wallets: action.payload };
    case WALLET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export function walletDetailsReducer(state = {loading: true}, action){
  switch (action.type) {
    case WALLET_DETAILS_REQUEST:
      return { loading: true };
    case WALLET_DETAILS_SUCCESS:
      return { loading: false, wallet: action.payload };
    case WALLET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
    return state;
  }
};



export function walletEditReducer(state = {}, action) {
  switch (action.type) {
    case WALLET_EDIT_REQUEST:
      return { loading: true };
    case WALLET_EDIT_SUCCESS:
      return { loading: false, wallet: action.payload, success: true };
    case WALLET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_EDIT_RESET:
      return {};
    default:
      return state;
  }
};


export function tokensTransferReducer(state = {}, action) {
  switch (action.type) {
    case TOKENS_TRANSFER_REQUEST:
      return { loading: true };
    case TOKENS_TRANSFER_SUCCESS:
      return { loading: false, payload: action.payload, success: true };
    case TOKENS_TRANSFER_FAIL:
      return { loading: false, error: action.payload };
    case TOKENS_TRANSFER_RESET:
      return {};
    default:
      return state;
  }
}

export function userAtomicNftUploadReducer(state = {}, action) {
  switch(action.type) {
    case USER_ATOMIC_NFT_UPLOAD_REQUEST: 
      return {loading: true };
    case USER_ATOMIC_NFT_UPLOAD_SUCCESS:
      return {loading: false, success: true, payload: action.payload};
    case USER_ATOMIC_NFT_UPLOAD_FAIL:
      return {loading: false, error: action.payload};
    case USER_ATOMIC_NFT_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
}