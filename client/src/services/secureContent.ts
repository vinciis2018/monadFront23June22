/* eslint-disable no-console */
import * as localforage from "localforage";
import { EncryptedDataModel } from "models";
import { ERROR_IDS } from "utils/constants";

const SECURED_CONTENT_KEY = "SECURED_CONTENT";
const SELF_DESTRUCT_KEY = "SELF_DESTRUCT_KEY";
const IV_KEY = "IV";

export async function sha256(value: string): Promise<ArrayBuffer> {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
}

export async function getKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    await sha256(password),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(
  key: CryptoKey,
  messageBuffer: ArrayBuffer
): Promise<{ iv: ArrayBuffer; ciphertext: ArrayBuffer }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  return {
    iv,
    ciphertext: await crypto.subtle.encrypt(
      {
        iv,
        name: "AES-GCM",
      },
      key,
      messageBuffer
    ),
  };
}

export async function decrypt(
  ciphertext: ArrayBuffer,
  iv: ArrayBuffer,
  key: CryptoKey
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    {
      iv,
      name: "AES-GCM",
    },
    key,
    ciphertext
  );
}

export function encode(content: any): ArrayBuffer {
  return new TextEncoder().encode(JSON.stringify(content));
}

export function decode<T extends object>(encoded: BufferSource): T {
  try {
    return JSON.parse(new TextDecoder().decode(encoded));
  } catch (e) {
    throw new Error(`${ERROR_IDS.DECODE}: ${e}`);
  }
}

export async function encryptContentAndSave(
  content: Partial<EncryptedDataModel>,
  textPassword: string
): Promise<void> {
  const key = await getKey(textPassword);
  const encodedContent = encode(content);
  const { ciphertext, iv } = await encrypt(key, encodedContent);
  await localforage.setItem(SECURED_CONTENT_KEY, ciphertext);
  await localforage.setItem(IV_KEY, iv);
}

export function retrieveAndDecryptContent(
  textPassword: string
): Promise<EncryptedDataModel> {
  return getKey(textPassword).then((key) =>
    Promise.all([
      localforage.getItem<ArrayBuffer | null>(SECURED_CONTENT_KEY),
      localforage.getItem<ArrayBuffer | null>(IV_KEY),
    ]).then(([retrievedContent, retrievedIv]) => {
      if (retrievedContent && retrievedIv) {
        const data = decrypt(retrievedContent, retrievedIv, key);
        return decrypt(retrievedContent, retrievedIv, key)
          .then((decryptedContent) =>
            decode<EncryptedDataModel>(decryptedContent)
          )
          .catch((e) => {
            throw new Error(`${ERROR_IDS.INCORRECT_PIN}, ${e}`);
          });
      } else {
        throw new Error(ERROR_IDS.NO_CONTENT);
      }
    })
  );
}

export async function clearSecureContent(): Promise<void> {
  await localforage.removeItem(SECURED_CONTENT_KEY);
  await localforage.removeItem(IV_KEY);
}

export async function saveSelfDestructPin(pin: string): Promise<void> {
  await localforage.setItem(SELF_DESTRUCT_KEY, pin);
}

export async function retrieveSelfDestructPin(): Promise<string | null> {
  return await localforage.getItem(SELF_DESTRUCT_KEY);
}

export async function hasEncryptedData(): Promise<boolean> {
  return Boolean(await localforage.getItem(SECURED_CONTENT_KEY));
}
