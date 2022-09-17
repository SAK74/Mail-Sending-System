import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { Mail, RequestType, Subscriber } from "../types";

// const subscribersURL = "https://enuxp5t0vvqu400.m.pipedream.net";
// const mailsURL = "https://enb5zkce5jncfjh.m.pipedream.net";
// const url = (type: RequestType) =>
//   type === "subscribers" ? subscribersURL : mailsURL;

export const fetchData = <T>(type: RequestType) =>
  createAsyncThunk(
    `${type}/fetch`,
    () => api.get<T>(type).then((data) => data.records) // or api.get(type) to mocked fetch
  );

export const update =
  <T extends Subscriber | Mail>(type: RequestType) =>
  (id: string, data: Partial<T["fields"]>): Promise<T> => {
    const defaultConfig = {
      url: type,
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify({ ...{ fields: data }, id }),
    };
    return api.patch<T>(defaultConfig);
  };

export const addItem =
  (type: RequestType) => (data: Subscriber["fields"] | Mail["fields"]) => {
    const defaultConfig = {
      url: type,
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify({ fields: data }),
    };
    return api.post(defaultConfig).then((data) => data);
  };

export const deleteItems = (type: RequestType) => (data: string[]) => {
  const defaultConfig = {
    url: type,
    headers: {
      "Content-type": "application/json",
    },
    params: data,
  };
  return api._delete(defaultConfig).then((data) => data.records);
};
