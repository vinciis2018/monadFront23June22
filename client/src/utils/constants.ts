export const AUTH_ROUTES: string[] = [
  "/upload",
  "/gallery",
  "/gallery-detail",
  "/upload-active",
  "/upload-library",
  "/upload-photos",
  "/upload-tags",
  "/upload-delay",
  "/upload-confirm",
  "/upload-archive",
  "/upload-success",
  "/setting",
  "/setting/recovery",
  "/setting/phrase-view",
  "/setting/advanced",
  "/setting/update-pin",
  "/setting/update-pin-success",
  "/setting/wifi-test",
  "/setting/self-destruct-pin",
  "/setting/self-destruct-pin-success",
  "/setting/self-destruct",
  "/logout",
  "/key-phrase-save",
  "/key-confirm",
  "/key-recovery",
];

export const NO_AUTH_ROUTES: string[] = [
  "/",
  "/login",
  "/welcome",
  "/key-management",
  "/pin-create",
  "/pin-success",
];

export const MNEMONICS_STUB: string = Array(12).fill("XXXX").join(" ");

export enum ERROR_IDS {
  NO_IPFS_NODE = "NO_IPFS_NODE",
  WALLET_LOCKED = "WALLET_LOCKED",
  WALLET_IMPORT = "WALLET_IMPORT",
  INCORRECT_PIN = "INCORRECT_PIN",
  DECODE = "DECODE",
  NO_CONTENT = "NO_CONTENT",
}
