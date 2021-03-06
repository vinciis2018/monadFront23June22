import Axios from 'axios';
import { sendRAT, sendAr, sendKoii } from 'ratCodes/ratTrap';
import { 
  WALLET_DETAILS_FAIL,
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST, 
  WALLET_CREATE_SUCCESS, 
  WALLET_EDIT_FAIL, 
  WALLET_EDIT_REQUEST, 
  WALLET_EDIT_SUCCESS, 
  WALLET_LIST_FAIL, 
  WALLET_LIST_REQUEST,
  WALLET_LIST_SUCCESS,
  TOKENS_TRANSFER_REQUEST,
  TOKENS_TRANSFER_SUCCESS,
  TOKENS_TRANSFER_FAIL,

} from '../Constants/walletConstants';

// wallet create
export const createWallet = (defWallet) => async (dispatch, getState) => {
  dispatch({
    type: WALLET_CREATE_REQUEST,
    payload: defWallet
  });
  const { userSignin: { userInfo } } = getState();
  const user = userInfo;
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/walletCreate`, {user, defWallet}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: WALLET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: WALLET_CREATE_FAIL,
      payload: message
    });
  }
};

// list all wallets

export const listWallets = () => async (dispatch, getState) => {
  dispatch({
    type: WALLET_LIST_REQUEST
  })
  const {userSignin: {userInfo}} = getState();

  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/wallets`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: WALLET_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: WALLET_LIST_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

// // get wallet details

// export const getWalletDetails = (walletId) => async (dispatch, getState) => {
//   dispatch ({
//     type: WALLET_DETAILS_REQUEST,
//     payload: walletId
//   });
//   const {userSignin: {userInfo}} = getState();
//   try {

//     // const { data } = await Axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/${walletId}`, {
//     //   headers: {
//     //     Authorization: `Bearer ${userInfo.token}`
//     //   },
//     // });


//     dispatch({
//       type: WALLET_DETAILS_SUCCESS,
//       // payload: data,
//     })
//   } catch (error) {

//     const message = error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message;

//     dispatch({
//       type: WALLET_DETAILS_FAIL,
//       payload: message
//     })
//   }
// }


// edit wallet

export const editWallet = (wallet) => async (dispatch, getState) => {
  dispatch ({
    type: WALLET_EDIT_REQUEST,
    payload: wallet
  });

  const {userSignin: {userInfo}} = getState();

  try {
    const {data} = await Axios.put(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/${userInfo._id}`, wallet, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    dispatch ({
      type: WALLET_EDIT_SUCCESS,
      payload: data,
    });

  } catch (error) {

    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: WALLET_EDIT_FAIL,
      payload: message
    })
  }

}


// transfer tokens

export const transferTokens = (transfer) => async (dispatch, getState) => {
  dispatch({
    type: TOKENS_TRANSFER_REQUEST,
    payload: transfer
  });

  const {userSignin: {userInfo}} = getState();
  try {
    if (transfer?.ticker === 'AR') {

      const data = await sendAr({
        walletName: transfer.walletName,
        toWallet: transfer.toWallet,
        amount: transfer.quantity
      });

      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });
    }

    else if(transfer.ticker === 'KOII') {
      const data = await sendKoii({
        toWallet: transfer.toWallet, 
        amount: transfer.quantity, 
        walletName: transfer.walletName
      });

      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });
    }

    else if(transfer.ticker === 'rat') {
      const data = await sendRAT({
        toWallet: transfer.toWallet, 
        amount: transfer.quantity, 
        walletName: transfer.walletName
      })

      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });

      console.log(`transferring ${data} `)

    } else {
      dispatch({
        type: TOKENS_TRANSFER_FAIL,
        payload: "invalid ticker"
      });
    }

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: TOKENS_TRANSFER_FAIL,
      payload: message
    });
  }
}

