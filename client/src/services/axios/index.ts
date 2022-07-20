import axios, { AxiosInstance, AxiosResponse } from "axios";

//change to an environment url eventually
const customAxios = axios.create({
  /* eslint-disable-next-line */
  baseURL: process.env.REACT_APP_BUNDLER_API_URL
});

customAxios.defaults.headers.common["Content-Type"] = "application/json";
customAxios.defaults.headers.post["Content-Type"] = "application/json";
// customAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default customAxios;

//change to an environment url eventually
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_URL,
});

// TODO: we could do better by creating an instance and assign the instance configs/options.

instance.defaults.headers.common["Content-Type"] = "application/json";

export function extractData<T>(response: AxiosResponse<T>): T {
  return response.data;
}
