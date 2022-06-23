import React, { useMemo, useState } from "react";
import { JWKInterface } from "arweave/web/lib/wallet";
import Arweave from "arweave";
import { Web } from "@_koi/sdk/web";
import {
  WalletHelper,
  clearSecureContent,
  hasEncryptedData as _hasEncryptedData,
  retrieveAndDecryptContent,
  retrieveSelfDestructPin,
  saveSelfDestructPin,
  temporarySavePin,
  wipeTemporarySavedPin,
  getTemporarySavedPin,
  setPinSet,
  isPinSet,
  encryptContentAndSave,
} from "services";
import { ERROR_IDS } from "utils/constants";
import { WithChildren } from "types/utils";

interface Context {
  mnemonics: string | undefined;
  isLoading: boolean;
  isConnected: any;
  hasEncryptedData(): Promise<boolean>;
  generateAndSave(pin: string): Promise<void>;
  importAndSave(pin: string, mnemonics: string): Promise<void>;
  tempSavePin(pin: string): Promise<string>;
  getTempSavedPin(): Promise<string | null>;
  wipeTempSavedPin(): Promise<void>;
  setupPin(pin: string): Promise<void>;
  isPinSetup(): Promise<boolean>;
  changePin(oldPin: string, newPin: string): Promise<void>;
  isUnlocked(): Promise<boolean>;
  unlock(pin: string): Promise<void>;
  lock(): void;
  setSelfDestructPin(destructPin: string): Promise<void>;
  checkAndTriggerSelfDestruct(pin: string): Promise<boolean>;
  getArweavePublicAddress(): string;
  signMessage(message: string): Promise<string>;
}

const Ctx = React.createContext<Context | undefined>(undefined);

export const ContextProvider = ({ children }: WithChildren) => {
  const wallet = useMemo<Web>(() => new Web(), []);
  const [$jwk, set$jwk] = useState<Promise<JWKInterface> | undefined>(
    undefined
  );
  const [mnemonics, setMnemonics] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<any>(false);


  /**
   * Func Helpers
   */

  const hasEncryptedData = (): Promise<boolean> => {
    return _hasEncryptedData();
  };

  const generateAndSave = (pin: string): Promise<void> => {
    setIsLoading(true);
    const $walletGenerate = WalletHelper.generateWalletAndSave(pin, wallet);

    const $newJwk = $walletGenerate.then(({ jwk }) => jwk);

    set$jwk($newJwk);

    $walletGenerate.then(({ mnemonics }) => setMnemonics(mnemonics));
    return $newJwk
      .then(() => { })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const importAndSave = (pin: string, mnemonics: string): Promise<void> => {
    setIsLoading(true);
    const $walletImport = WalletHelper.importWalletAndSave(pin, mnemonics, wallet);
    set$jwk($walletImport);

    setMnemonics(mnemonics);

    return $walletImport
      .then(() => { })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const tempSavePin = (pin: string): Promise<string> => {
    return temporarySavePin(pin);
  };

  const wipeTempSavedPin = (): Promise<void> => {
    return wipeTemporarySavedPin();
  };

  const getTempSavedPin = (): Promise<string | null> => {
    return getTemporarySavedPin();
  };

  const setupPin = (): Promise<void> => {
    return setPinSet();
  };

  const isPinSetup = (): Promise<boolean> => {
    return isPinSet();
  };

  const changePin = (oldPin: string, newPin: string): Promise<void> => {
    return WalletHelper.changePin(oldPin, newPin);
  };

  const isUnlocked = async (): Promise<boolean> => {
    const data = Boolean((await hasEncryptedData()) || $jwk);
    // const data = Boolean(await hasEncryptedData());
    if(data) {
      setIsConnected(true);
      setIsLoading(false);
    } else {
      setIsLoading(true)
    }
    return isConnected;
  };

  const unlock = (pin: string): Promise<void> => {
    setIsLoading(true);
    const $walletLoad = retrieveAndDecryptContent(pin).then((dataModel) =>
        WalletHelper.importWallet(dataModel.jwk, wallet).then(() => {
        return dataModel
      })
    );
    set$jwk($walletLoad.then(({ jwk }) => jwk));
    $walletLoad.then(({ mnemonics }) => setMnemonics(mnemonics));
    return $walletLoad
      .then((res) => {
        encryptContentAndSave({ jwk: res?.jwk, mnemonics }, pin).then(() => {})
      })
      .finally(() => {
        setIsLoading(false);
      }).catch((e) => e);
  };

  const lock = (): void => {
    set$jwk(undefined);
    setMnemonics(undefined);
  };

  const setSelfDestructPin = (destructPin: string): Promise<void> => {
    return saveSelfDestructPin(destructPin);
  };

  const getArweavePublicAddress = (): string => {
    return wallet.address!;
  };

  const signMessage = (message: string): Promise<string> => {
    const strBuffer = new TextEncoder().encode(message);
    if (!$jwk) {
      throw new Error(ERROR_IDS.WALLET_LOCKED);
    }
    return $jwk.then((jwk) =>
      Arweave.crypto
        .sign(jwk, strBuffer, {
          saltLength: 32,
        })
        .then((signedBuffer) => new TextDecoder().decode(signedBuffer))
    );
  };

  const checkAndTriggerSelfDestruct = (pin: string): Promise<boolean> => {
    return retrieveSelfDestructPin()
      .then((destructPin) => destructPin === pin)
      .then(async (shouldTrigger) => {
        if (shouldTrigger) {
          await clearSecureContent();
        }
        return shouldTrigger;
      });
  };

  return (
    <Ctx.Provider
      value={{
        mnemonics,
        isLoading,
        isConnected,
        hasEncryptedData,
        generateAndSave,
        importAndSave,
        tempSavePin,
        getTempSavedPin,
        wipeTempSavedPin,
        setupPin,
        isPinSetup,
        changePin,
        isUnlocked,
        unlock,
        lock,
        setSelfDestructPin,
        checkAndTriggerSelfDestruct,
        getArweavePublicAddress,
        signMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useWallet must be used inside WalletProvider`);
  }
  return context;
}

export { ContextProvider as WalletProvider, useContext as useWallet };
