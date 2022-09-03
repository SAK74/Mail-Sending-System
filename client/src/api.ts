import axios, { AxiosRequestConfig } from "axios";
import { ReduxState } from "./store";
// import qs from "qs";
import { Mail, Subscriber } from "./types";

export const setupInterceptors = (getState: () => ReduxState) => {
  axios.interceptors.request.use((config) => {
    // console.log("getState in API", getState());
    const { token } = getState().loggin;
    // console.log("token in API", token);
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  });
};

function request(config: AxiosRequestConfig) {
  console.log("config: ", config);
  return axios(config)
    .then((resp) => resp.data)
    .catch((err) => {
      let message;
      if (err.response) {
        console.error("err.response: ", err.response);
        if (err.response.data.error) {
          message = err.response.data.error.message;
        } else {
          message = err.response.data;
        }
      } else {
        console.error(err);
        message = err.message;
      }
      console.log(message);
      throw Error(message);
    });
}
function get<T>(url: string): Promise<{ records: T[] }> {
  return request({baseURL:url});
}
function patch<T>(config: AxiosRequestConfig): Promise<T> {
  config.headers = { ...config?.headers };
  return request({
    ...config,
    method: "PATCH",
  });
}
function post(
  config: AxiosRequestConfig
): Promise<Subscriber | Mail | { message: string; id: string }> {
  config.headers = { ...config?.headers };
  return request({
    ...config,
    method: "POST",
  });
}
function _delete(
  config: AxiosRequestConfig
): Promise<{ records: { id: string; deleted: boolean }[] }> {
  // config.paramsSerializer = (params) =>
  //   qs.stringify({ records: params }, { arrayFormat: "brackets" });
  return request({
    ...config,
    method: "DELETE",
  });
}
const api = { get, patch, post, _delete };
export default api;
