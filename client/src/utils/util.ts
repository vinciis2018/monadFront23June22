import moment from "moment";
import { map, sum } from "lodash";

export const suffleArray = (arr: string[]) => {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
};

export const getTimestamp = (dateObj: Date) => {
  const timestamp = Math.floor(dateObj.getTime() / 1000);
  return timestamp;
};

export const getMomentObjFromDateObj = (dateObj: Date) => {
  var m = moment(); // Initial moment object
  var newDate = moment(dateObj);
  // Inject it into the initial moment object
  m.set(newDate.toObject());
  return m;
};

export const getFormattedDateFromTimestamp = (
  ft: string = "lll",
  tp: number
) => {
  return moment.unix(tp).format(ft);
};

// write a function to get an array of random integers of length n
export function getRndIntegers(min: number, max: number) {
  var n: number[] = [];
  while (n.length < 3) {
    const rnd: number = Math.floor(Math.random() * max) + 1;
    if (n.indexOf(rnd) === -1) n.push(rnd);
  }
  return n.sort();
}

export const getUniqueRandomNumbersArray = (length: number, max: number) => {
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < length)
    uniqueNumbers.add(Math.floor(Math.random() * max));
  return Array.from(uniqueNumbers);
};

export const splitArrayIntoHalf = <T>(items: T[]) => {
  const half = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, half);
  const secondHalf = items.slice(-half);

  return { firstHalf, secondHalf };
};

export const isPWA = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

export function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(sum(map(arrays, "length")));
  arrays.reduce<number>((byteOffset: number, buffer: Uint8Array) => {
    result.set(buffer, byteOffset);
    return byteOffset + buffer.length;
  }, 0);
  return result;
}

const nullUnicode = "\u0000";
const startIdentifier = "data:image";
export function extractImageBase64(fullBase64: string) {
  return fullBase64
    .substring(fullBase64.indexOf(startIdentifier))
    .replaceAll(nullUnicode, "");
}
