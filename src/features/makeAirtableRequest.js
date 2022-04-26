import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
// const airtableURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/subscribers/";
// const defaultConfig = {
//   baseURL
//   // headers: { Authorization: "Bearer ... }
// };
const subscribersURL = "https://enuxp5t0vvqu400.m.pipedream.net";
const mailsURL = "https://enb5zkce5jncfjh.m.pipedream.net";
const url = type => type === "subscribers" ? subscribersURL : mailsURL;

export const fetchData = type => createAsyncThunk(`fetch${type}`, () =>
  api.get(url(type)).then((data) => data.records)
);

export const update = type => (id, data) => {
  const defaultConfig = {
    baseURL: url(type),
    headers: {
      "Content-type": "application/json"
    },
    data: JSON.stringify({ ...{ fields: data }, id })
  };
  return api.patch(defaultConfig).then((data) => data);
}

export const addItem = type => data => {
  const defaultConfig = {
    baseURL: url(type),
    headers: {
      "Content-type": "application/json"
    },
    data: JSON.stringify({ fields: data })
  }
  return api.post(defaultConfig).then((data) => data);
}

export const deleteItems = type => data => {
  const defaultConfig = {
    baseURL: url(type),
    headers: {
      "Content-type": "application/json"
    },
    params: data
  }
  return api._delete(defaultConfig).then((data) => data.records);
}
