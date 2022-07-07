import Arweave from "arweave";
// import smartweave from "smartweave"
import * as SmartWeaveSDK from 'redstone-smartweave';
import * as WarpSdk from 'warp-contracts';
// utils

const arweaveOptions = {
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
};


async function initArweave() {
  let arweave;
  try {
    arweave = await poll(() => (Window).Arweave, 5000, 200);
  } catch (error) {
    arweave = Arweave;
  }
  arweave = new arweave(arweaveOptions);

  return arweave;
}

// read contract 
export const readContract = async (myContractId) => {
  try {
    let arweave = await initArweave();
    const warp = WarpSdk.WarpNodeFactory.memCached(arweave);
    const contract = warp.contract(myContractId);
    const { state } = await contract.readState();
    return {state}
  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
}


// register game
export const registerGame = async ({ walletAddress, data }) => {
  let quantity;
  const contractId = `ERb0h5CepgnFMpxPeaxhn9qt0iCa0U2oKIiLJYHmdQU`;
  console.log(contractId)

  try {
    // init arweave
    let arweave = await initArweave();

    const input = {
      gameId: data.gameData._id,
      gameName: data.gameData.name,
      gameTitle: `${data.gameData.name}_${data.gameData.gameType}`,
      gameType: data.gameData.gameType,
      gameTags: data.gameData.tags,
      gamePage: data.gameData.gamePage,
      gameParams: data.gameParams,
    }

    const initialState = {
      ratId: input.gameId,
      owner: walletAddress,
      title: input.gameTitle,
      name: input.gameName,
      description: input.gamePage,
      gameType: input.gameType,
      gameParams: input.gameParams,
      stakes: {
        likeEP: {},
        flagEP: {},
        EPs: {},
        EPa: {}
      },
      withdraws: {},
      rewardDistributions: {
        sell: {},
        worthless: {},
        interaction: {}
      },
      locked: [],
      contentType: "application/json",
      createdAt: new Date().toString(),
      tags: input.gameTags,
      additonal: {}
    };

    if(data.gameData.gameType === `SCREEN_GAME`) {
      quantity = data.gameData.screenWorth
    } else if(data.gameData.gameType === `ADVERT_GAME`) {
      quantity = data.gameData.adWorth
    } else {
      quantity = 0;
    }

    // Create transaction
    const game = await createContract(initialState);
    console.log(game)
    
    if(game) {
      const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
      const contract = smartweave.contract(contractId).setEvaluationOptions({ ignoreExceptions: false});
      const {state} = await contract.readState();
      console.log(state);
      // register game in ratState
      const ratResultTx = await contract.connect('use_wallet' || data?.walletName).bundleInteraction({
        function : "registerGame",
        gameContract : game.gameId,
        gameContractState: game.state,
        qty : Number(quantity),
        type : {game: data.gameData.gameType, active: true, time: new Date().toString() }
      });
      console.log("redStone-smartweave-writeInteraction:", ratResultTx);

      return {
        game,
        initialState,
        ratResultTx,

      };

    } else {
      console.log("Game Registration Failed, please contact moderator")
      return ("Game Registration Failed, please contact moderator")
    }
  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
};


// create game contract
const createContract = async (initialState) => {
  console.log("1", initialState)
  let arweave = await initArweave();
  let tx = await arweave.createTransaction({
    data: JSON.stringify(initialState)
  });
  tx.addTag('App-Name', 'SmartWeaveContract');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract-Src', `WPbOSu82Oh9uH3hcq2R51gw5uuA4R3k4C94LraVgApE`);
  tx.addTag('Content-Type', `application/json`);
  tx.addTag('Init-State', JSON.stringify(initialState));
  tx.addTag('Service-Name', 'Blinds By Vinciis');
  console.log("2", tx)
  await window.koiiWallet.sign(tx);
  await arweave.transactions.post(tx);
  // let txFee = await arweave.transactions.getPrice(tx.data_size);
  // console.log("4", txFee)
  // const tx = {id: 'PRkKmBHJ_inw-qFr5vW8URfgR8HC5i-JUmaj-2KYCuo'}
  const gameId = tx.id;
  console.log("3", gameId)

  const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
  const contract = smartweave.contract(gameId).setEvaluationOptions({ ignoreExceptions: false});
  const {state} = await contract.readState();

  return {gameId, state}  
}


// deregister game
export const deregisterGame = async ({walletAddress, data}) => {

  const contractId = `ERb0h5CepgnFMpxPeaxhn9qt0iCa0U2oKIiLJYHmdQU`;
  console.log(contractId)
console.log(data)
  try {
    // init arweave
    let arweave = await initArweave();
    
    if(data.gameData.gameType === `SCREEN_GAME`) {
      quantity = data.gameData.screenWorth
    } else if(data.gameData.gameType === `ADVERT_GAME`) {
      quantity = data.gameData.adWorth
    } else {
      quantity = 0;
    }
  
    const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
    const contract = smartweave.contract(contractId).setEvaluationOptions({ ignoreExceptions: false});
    const ratResultTx = await contract.connect('use_wallet' || data?.walletName).bundleInteraction({
      function : "deregisterGame",
      gameContract : data.gameData,
      gameState: data?.gameState,
      qty : Number(data?.quantity),
      type : { game: data.gameData.gameType, time: new Date().toString() }
    })
  
    return ratResultTx
  
  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
  
}


export const gameInteraction = async ({walletAddress, data}) => {
  let gameState;
  let ratState;
  let gameTx;
  let ratTx;
  let walletName = data.walletName;
  const contractId = `ERb0h5CepgnFMpxPeaxhn9qt0iCa0U2oKIiLJYHmdQU`;
  console.log(contractId)

  try {
    let arweave = await initArweave();
    const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
  
    if(data.screen) {
      const gameId = data.calender.activeGameContract;
      console.log(data)
      if(data.interaction === "like") {
        const contract = smartweave.contract(gameId).setEvaluationOptions({ ignoreExceptions: false});
        const gameResultTx = await contract.connect('use_wallet' || walletName).bundleInteraction({
          function : `stake`,
          interaction : data.interaction,
          pool: "likeEP",
          qty : Number((1/data.screen.scWorth).toFixed(5)),
        })
        const {state} = await contract.readState();
        gameState = state;
        console.log(gameState);
        // gameTx = gameResultTx;

        if(state.stakes.likeEP[walletAddress]) {
          const ratResultTx = await sendRAT({ walletAddress: data.screen.master, amount: (1/data.screen.scWorth).toFixed(5) })
          ratState = ratResultTx.state;
          console.log(ratState);
          // ratTx = ratResultTx;
        }

     
    
      }

      // return { gameTx, ratTx }
     
    }

    if(data.advert) {

    }
   
  
  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }

}

// transfer Rat
export const sendRAT = async ({toWallet, amount, walletName}) => {
  let quantity;

  // rat contract
  const contractId = `ERb0h5CepgnFMpxPeaxhn9qt0iCa0U2oKIiLJYHmdQU`;
  console.log(contractId)

  try {
    let arweave = await initArweave();
    const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
    const contract = smartweave.contract(contractId).setEvaluationOptions({ ignoreExceptions: false});
    console.log(contract)

    quantity = Number(amount);
    console.log(quantity)
    console.log(toWallet)

    const result = await contract.connect('use_wallet' || walletName).bundleInteraction({
      function : `transfer`,
      target : toWallet,
      qty : Number(quantity),
    })
    console.log(result)
    const data = result.originalTxId;
    return {data}

  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
}

// send Ar
export const sendAr = async ({toWallet, amount, walletName}) => {

  try {
    let arweave = await initArweave();
    const tx = await arweave.createTransaction({
      target: toWallet,
      quantity: arweave.ar.arToWinston(Number(amount)),
    }, walletName);

    console.log(tx);
      
    await arweave.transactions.sign(tx, walletName);
    console.log("signing done", tx) 
    await arweave.transactions.post(tx);
    console.log("submitted", tx.id) 
    return tx
  } catch {
    console.log("error", error)
    throw new Error(error);
  }
}

// send koii
export const sendKoii = async ({toWallet, amount, walletName}) => {
  let quantity;
  // koii contract
  const contractId = `QA7AIFVx1KBBmzC7WUNhJbDsHlSJArUT0jWrhZMZPS8`;
  console.log(contractId)

  try {
    let arweave = await initArweave();
    const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
    const contract = smartweave.contract(contractId).setEvaluationOptions({ ignoreExceptions: false});
    console.log(contract)

    quantity = Number(amount);

    const result = await contract.connect('use_wallet' || walletName).bundleInteraction({
      function : `transfer`,
      target : toWallet,
      qty : Number(quantity),
    })
    console.log(result)
    const data = result.originalTxId;
    return {data}

  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
}