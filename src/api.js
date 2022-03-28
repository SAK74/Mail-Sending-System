import axios from "axios";

const defaultConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

function request(config) {
  config.data = config.data ? JSON.stringify(config.data) : null;
  // console.log("config: ", config);
  return axios(config)
    .then((resp) => resp.data)
    .catch((err) => {
      if (err.response) {
        console.log("err.response: ", err.response);
        throw Error(err.response.data.error.message);
      }
      console.log(err);
      throw Error(err.message);
    });
}
function get(config) {
  return request(config);
}
function patch(data, config) {
  config.headers = { ...config.headers, ...defaultConfig.headers };
  return request({
    ...config,
    method: "PATCH",
    data
  });
}
function post(data, config) {
  config.headers = { ...config.headers, ...defaultConfig.headers };
  return request({
    ...config,
    method: "POST",
    data
  });
}

export default { get, patch, post };
