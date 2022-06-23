import { JWKInterface } from "arweave/web/lib/wallet";

export interface EncryptedDataModel {
  jwk: JWKInterface;
  mnemonics: string;
}
