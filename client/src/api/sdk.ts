// sdk
import * as kweb from "@_koi/sdk/web";
import axios from "axios";
import redstone from 'redstone-api';
import arweaveGraphql,{ SortOrder, TagOperator } from 'arweave-graphql'

let koiSDK = new kweb.Web();

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export const getAddress = async () => {
  const extension = window.koiiWallet;
  try {
    let res = await extension.getAddress();
    if (res) return res;
    else throw new Error(res.data);
  } catch (error: any) {
    // If we get here it's most likey user uninstalled extension and re-installed
    // Very edgy edge-case, but better to handle than not
    extension?.disconnect();
    throw new Error(error);
  }
};

export const getRatBalance = async (walletAddress: any) => {
  let rat: any;
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/rat`);
    rat = data.balances[walletAddress] || 0;
    return  rat ;

  } catch (error: any) {
    throw new Error(error);
  }
}

export const getBalances = async (walletAddress: any) => {
  let koii: any;
  let ar: any;
  let ratData: any;
  try {


    await koiSDK.setWallet(walletAddress);
    koii = await koiSDK.getKoiBalance();
    ar = await koiSDK.getWalletBalance();
    const {data} = await axios.get(`${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/rat`);
    ratData = data?.balances[walletAddress] || 0;
    // console.log("ratdata", ratData)
    return { koii, ar, ratData };
  } catch (error) {
    console.log(error);
  }
};



//blinds
export const getPrice = async (walletAddress: any) => {
  let koiiPrice: any;
  let arPrice: any;
  let ratPrice: any;
  let totalPrice: any;
  let balances: any;
  let koiiData: any;
  let arData: any;
  let ratData: any;
  let arBalance: any;
  let koiiBalance: any;
  let ratBalance: any;

  try {
    balances = await getBalances(walletAddress)
    if(balances) {
      
      arData = await redstone.getPrice("AR");
      arPrice = arData.value   //USD
      // console.log("arBalance", arPrice)

      // koiiData = await redstone.getPrice("KOII"); 
      koiiPrice = 1  //USD
      // console.log("arBalance", koiiPrice)

      // ratData = await redstone.getPrice("RAT");
      ratPrice = 1;  //INR
      // console.log("arBalance", ratPrice)

      
      return {arPrice, koiiPrice, ratPrice};
    } else {
      throw new Error("something went wrong")
    }

  } catch (error) {}
}


//blinds
export const getExhangeRate = async ({to, from, quant} : any) => {
  let options: any;
  let host: any;
  let output: any;
  try {
    host = "api.frankfurter.app";
    options = fetch(`https://${host}/latest?amount=${quant}&from=${from}&to=${to}`)
      .then((val) => val.json())
      .then((res) => {
        output = Object.values(res.rates)[0];
        // console.log("value rate", Object.values(res.rates)[0]);
        return output;
      })
      return options;
  } catch (error: any) {
    throw new Error(error);
  }
}

//blinds
export const getLastTransaction = async ({walletAddress} : any) => {
  let lastTxn: any;
  let balance: any;
  let txnDetail: any;
  let debDetail: any;
  let credDetail: any;
  let moreDetail: any;
  try {
    balance = await axios.get(`https://arweave.net/wallet/${walletAddress}/balance`)
    lastTxn = await axios.get(`https://arweave.net/wallet/${walletAddress}/last_tx`);
    const transactionsResult = await arweaveGraphql('arweave.net/graphql').getTransactions({
      owners: [walletAddress],
    })
    debDetail = transactionsResult?.transactions?.edges;

    const recipientResult = await arweaveGraphql('arweave.net/graphql').getTransactions({
      recipients: [walletAddress],
    })
    credDetail = recipientResult?.transactions?.edges;

    if(lastTxn){
      txnDetail = await arweaveGraphql('arweave.net/graphql').getTransactions({
        ids: [lastTxn?.data],
      })
    }

    return {lastTxn, txnDetail, balance, credDetail, debDetail };
  } catch(error: any) {
    throw new Error(error);

  }
}


//blinds
export const getHistoricalData = async ({ticker} : any) => {
  let historicalData: any;
  try {
    const data = await redstone.getHistoricalPrice(ticker, {
      offset: 1000,
      limit: 100,
    });
    
    historicalData = data
    // console.log("data", data)
    return historicalData;
  } catch (error: any) { 

  }
}
