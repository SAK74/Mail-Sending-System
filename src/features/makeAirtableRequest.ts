import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { Mail, RequestType, Subscriber } from "../types";
// const airtableURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/subscribers/";
// const defaultConfig = {
//   baseURL
//   // headers: { Authorization: "Bearer ... }
// };
const subscribersURL = "https://enuxp5t0vvqu400.m.pipedream.net";
const mailsURL = "https://enb5zkce5jncfjh.m.pipedream.net";
const url = (type: RequestType) => type === "subscribers" ? subscribersURL : mailsURL;

export const fetchData = <T>(type: RequestType) => createAsyncThunk(`${type}/fetch`, () =>
  api.get<T>(url(type)).then((data) => data.records)
);

export const update = <T extends (Subscriber | Mail)>(type: RequestType) =>
  (id: string, data: Partial<T['fields']>): Promise<T> => {
    const defaultConfig = {
      baseURL: url(type),
      headers: {
        "Content-type": "application/json"
      },
      data: JSON.stringify({ ...{ fields: data }, id })
    };
    return api.patch<T>(defaultConfig);
  }

export const addItem = (type: RequestType) =>
  (data: Subscriber['fields'] | Mail['fields']) => {
    const defaultConfig = {
      baseURL: url(type),
      headers: {
        "Content-type": "application/json"
      },
      data: JSON.stringify({ fields: data })
    }
    return api.post(defaultConfig).then((data) => data);
  }

export const deleteItems = (type: RequestType) =>
  (data: string[]) => {
    const defaultConfig = {
      baseURL: url(type),
      headers: {
        "Content-type": "application/json"
      },
      params: data
    }
    return api._delete(defaultConfig).then((data) => data.records);
  }
