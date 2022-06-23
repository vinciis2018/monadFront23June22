import React, { ReactNode } from "react";
// api
import { getAddress, getRatBalance, getExhangeRate, getHistoricalData, getLastTransaction, getPrice } from "api/sdk";
import { connectToExtension, disconnectExtension, initExtension } from "api/finnie";
// utils
import { toast } from "services/utils";
import { arweaveWalletConnect } from "api/arweaveWallet";

//blinds
// import { getMyTxns } from "api/vertoProtocol";

interface ContextInterface {
  state: any;
  dispatch: any;
}

const Context = React.createContext<ContextInterface | null>(null);
Context.displayName = "ArWalletContext";

const actionTypes = {
  changeValue: "CHANGE_VALUE"
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.changeValue:
      const { payload } = action;
      return { ...state, ...payload };
    default:
      throw new Error(`No action type found for arWalletReducer`);
  }
};

const initializer = () => {
  return {
    walletAddress: null,
    walletBalance: null,
    isError: false,
    isLoading: false,
    isArWalletConnected: false
  };
};

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, null, initializer);

  /* Helper Functions */
  const connectArWallet = async (isAsync: boolean = false) => {
    let address;
    let ratBalance: any;
    let price: any;
    let exchangeRate: any;
    let transaction: any;
    let tokenHistory: any;
    try {
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: true, isError: null, isArWalletConnected: false }
      });
      toast({ title: "Connecting ArWallet..." });

      await arweaveWalletConnect().then(async (res: any) => {
        address = res?.key;

        await getRatBalance(res?.key).then(res => {
          console.log("srasfasfa", res)
          ratBalance = res;
        });

        await getPrice(res?.key).then(res => {
          price = res;
        });

        await getExhangeRate({
          to: "INR",
          from: "USD",
          quant: "1"
        }).then(res => {
          exchangeRate = res
        });
        
        await getHistoricalData({
          ticker: "AR"
        }).then(res => {
          tokenHistory = res
        })
        
        dispatch({
          type: "CHANGE_VALUE",
          payload: { 
            walletAddress: address, 
            isArWalletConnected: true, 
            isLoading: false, 
            isError: null, 
            walletBalance: ratBalance, 
            walletPrice: price, 
            xchangeRate: exchangeRate,
            tokenHis: tokenHistory
          }
        });
        toast({ status: "success", title: "Connected ArWallet" });
        return ratBalance;
      
      });
    } catch (error: any) {
      toast({ status: "error", title: "Error connecting ArWallet" });
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: false, isError: error, walletAddress: null, isArWalletConnected: false }
      });
      if (isAsync) {
        throw { message: "Error connecting ArWallet" };
      }
    }
    return address;
  };
  const disconnectArWallet = async () => {
    // Check if extension exists and get permissions.
    await disconnectExtension();
    await window?.arweaveWallet?.disconnect();
    localStorage.removeItem('portWallet')
    console.log("wallet disconnected")
    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        walletAddress: null,
        walletBalance: null,
        isError: false,
        isLoading: false,
        isArWalletConnected: false
      }
    });
  };

  return <Context.Provider value={{ state: { ...state, connectArWallet, disconnectArWallet }, dispatch }}>{children}</Context.Provider>;
};

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useArWallet must be used inside ArWalletProvider`);
  }
  return context;
}

export { ContextProvider as ArWalletProvider, useContext as useArWallet };
