import axios, { AxiosRequestConfig } from "axios";
// import qs from "qs";
import { Mail, Subscriber } from "./types";


const storage = localStorage.getItem('persist:login');
const token = storage && JSON.parse(storage, (key, value) => {
  if (typeof value === 'string'){
    console.log('json: ',key, value);
    return value;
  }
});
console.log('json main: ', storage);
console.log('request: ', token);

// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

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
function get<T>(config: string): Promise<{ records: T[] }> {
  return request(config);
}
function patch<T>(config: AxiosRequestConfig): Promise<T> {
  config.headers = { ...config?.headers};
  return request({
    ...config,
    method: "PATCH",
  });
}
function post(config: AxiosRequestConfig): Promise<Subscriber | Mail | { message: string, id: string }> {
  config.headers = { ...config?.headers };
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
const api = { get, patch, post, _delete }
export default api;
