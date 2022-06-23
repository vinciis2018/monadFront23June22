import { ArweaveWebWallet } from 'arweave-wallet-connector';


export const JWKwallet = async () => {
  const JWK = arweaveWalletConnect();
  console.log("JWK", JWK);
}

export const arweaveWalletConnect = async () => {


  try {
    const wallet = new ArweaveWebWallet({
      name: 'Blinds by Vinciis',
      logo: 'https://arweave.net/c3hPy664e-h0_6wS_RvvoKpWH0ZrJ3OrTeHJHFUSu-w'
    })
    
    wallet.setUrl('arweave.app')
    await wallet.connect(); 
    // console.log("wallet", wallet);

    if(wallet) {
      const key = await window.arweaveWallet.getActiveAddress();
      return {key};
    } else {
      console.log("something went wrong")
      return false;
    }
  } catch (err: any) {
    console.log("error", err);
    throw new Error(err);
  }
}
  

export const getWalletKey = async () => {
  
  try {
    const wallet = new ArweaveWebWallet({
      name: 'Blinds by Vinciis',
      logo: 'https://arweave.net/c3hPy664e-h0_6wS_RvvoKpWH0ZrJ3OrTeHJHFUSu-w'
    })
    
    wallet.setUrl('arweave.app')
    await wallet.connect(); 
    // console.log("wallet", wallet);

    if(wallet) {
      const key2 = await window.arweaveWallet.getActivePublicKey();
      return {key2};
    } else {
      console.log("something went wrong")
      return false;
    }
  } catch (err: any) {
    console.log("error", err);
    throw new Error(err);
  }
}

export const sendAr = async (artistAddress: string, amount: number) => {
  const extension = window.koiiWallet;
  return await extension.sendAr(artistAddress, amount);
}