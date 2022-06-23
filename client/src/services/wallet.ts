import { Web } from "@_koi/sdk/web";
import { JWKInterface } from "arweave/web/lib/wallet";

import {
  encryptContentAndSave,
  retrieveAndDecryptContent,
} from "./secureContent";
import { ERROR_IDS } from "utils/constants";

interface walletWithMnemonics {
  jwk: JWKInterface;
  mnemonics: string;
}

export class WalletHelper {
  static generateWallet(wallet: Web): Promise<walletWithMnemonics> {
    return wallet.generateWallet(true).then(() => {
      return {
        jwk: wallet.wallet!,
        mnemonics: wallet.mnemonic!,
      };
    });
  }

  static importWallet(
    mnemonicsOrJwk: string | JWKInterface,
    wallet: Web
  ): Promise<JWKInterface> {
    return wallet
      .loadWallet(mnemonicsOrJwk)
      .then((res) => (
        wallet.wallet!
        ))
      .catch((e) => {
        throw new Error(`${ERROR_IDS.WALLET_IMPORT}:${e}`);
      });
  }

  static generateWalletAndSave(
    pin: string,
    wallet: Web
  ): Promise<walletWithMnemonics> {
    return this.generateWallet(wallet).then(({ jwk, mnemonics }) =>
      encryptContentAndSave({ jwk, mnemonics }, pin).then(() => ({
        jwk,
        mnemonics,
      }))
    );
  }

  static importWalletAndSave(
    pin: string,
    mnemonics: string,
    wallet: Web
  ): Promise<JWKInterface> {
    return this.importWallet(mnemonics, wallet).then((jwk) =>
      encryptContentAndSave({ jwk, mnemonics }, pin).then(() => jwk)
    );
  }

  static changePin(oldPin: string, newPin: string): Promise<void> {
    return retrieveAndDecryptContent(oldPin).then((data) =>
      encryptContentAndSave(data, newPin)
    );
  }
}
