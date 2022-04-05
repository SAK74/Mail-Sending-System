import api from "../api";

const baseURL = "https://enb5zkce5jncfjh.m.pipedream.net";
const defaultConfig = {
   baseURL,
   // headers: {
   //    "Content-type": "application/json"
   // }
}

export const saveMail = (data) => api.post({ fields: data }, defaultConfig).then((data) => console.log(data));