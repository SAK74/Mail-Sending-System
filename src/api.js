import axios from "axios";
// import qs from "qs";

const defaultConfig = {
  // headers: {
  //   "Content-Type": "application/json"
  // }
};

function request(config) {
  console.log("config: ", config);
  return axios(config)
    .then((resp) => resp.data)
    .catch((err) => {
      if (err.response) {
        console.error("err.response: ", err.response);
        if (err.response.data.error) {
          throw Error(err.response.data.error.message)
        }
        throw Error(err.response.data?.message);
      }
      console.error(err);
      throw Error(err.message);
    });
}
function get(config) {
  return request(config);
}
function patch(config) {
  config.headers = { ...config?.headers, ...defaultConfig?.headers };
  return request({
    ...config,
    method: "PATCH",
  });
}
function post(config) {
  config.headers = { ...config?.headers, ...defaultConfig?.headers };
  return request({
    ...config,
    method: "POST",
  });
}
function _delete(config) {
  // config.paramsSerializer = (params) =>
  //   qs.stringify({ records: params }, { arrayFormat: "brackets" });
  return request({
    ...config,
    method: "DELETE"
  });
}

export default { get, patch, post, _delete };
