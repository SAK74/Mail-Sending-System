import axios, { AxiosRequestConfig } from "axios";
import { setError } from "./pages/subscribers/subscribersSlice";
// import qs from "qs";
import store from './store';
import { Mail, Subscriber } from "./types";

const defaultConfig = {
  headers: {
    // "Content-Type": "application/json"
  }
};

function request<T>(config: T) {
  console.log("config: ", config);
  return axios(config)
    .then((resp) => resp.data)
    .catch((err) => {
      let message;
      if (err.response) {
        console.error("err.response: ", err.response);
        if (err.response.data.error) {
          message = err.response.data.error.message;
          // throw Error(err.response.data.error.message)
        } else {
          message = err.response.data?.message;
          // throw Error(err.response.data?.message);
        }
      } else {
        console.error(err);
        message = err.message;
      }
      console.log(message);
      store.dispatch(setError(message));
      throw Error(message);
    });
}
function get<T>(config: string): Promise<{ records: T[] }> {
  return request(config);
}
function patch<T>(config: AxiosRequestConfig): Promise<T> {
  config.headers = { ...config?.headers, ...defaultConfig?.headers };
  return request({
    ...config,
    method: "PATCH",
  });
}
function post(config: AxiosRequestConfig): Promise<Subscriber | Mail | { message: string, id: string }> {
  config.headers = { ...config?.headers, ...defaultConfig?.headers };
  return request({
    ...config,
    method: "POST",
  });
}
function _delete(config: AxiosRequestConfig): Promise<{ records: { id: string, deleted: boolean }[] }> {
  // config.paramsSerializer = (params) =>
  //   qs.stringify({ records: params }, { arrayFormat: "brackets" });
  return request({
    ...config,
    method: "DELETE"
  });
}

export default { get, patch, post, _delete };
