import axios from "axios";

// const defaultConfig = {
//   headers: {
//     "Content-Type": "application/json"
//   }
// };

function get(config) {
  return axios(config)
    .then((resp) => resp.data)
    .catch((err) => {
      console.log(err);
      throw Error(err.message);
    });
}
function patch(data, config) {
  // const headers = new Headers(config.headers);
  // config.headers = headers.append("Content-Type", "application/json");
  config.headers = { ...config.headers, "Content-Type": "application/json" };
  // console.log("config: ", { ...config });
  return axios({
    // ...defaultConfig,
    ...config,
    method: "PATCH",
    data: JSON.stringify(data)
  })
    .then((resp) => resp.data)
    .catch((err) => {
      if (err.response) {
        console.log("err.response: ", err.response);
        throw Error(err.response.error.message);
      }
      console.log(err);
      throw Error(err.message);
    });
}
export default { get, patch };
