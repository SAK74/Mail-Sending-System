import { createAsyncThunk } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import api from "../api";
const baseURL = "https://enuxp5t0vvqu400.m.pipedream.net";
// const airtableURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/subscribers/";
const defaultConfig = {
  baseURL
  // headers: { Authorization: "Bearer ... }
};

const fetchSubscribers = createAsyncThunk("fetchSubscribers", () =>
  api.get(defaultConfig).then((data) => data.records)
);

function updateSubscriber(id, data) {
  defaultConfig.headers = {
    "Content-type": "application/json"
  };
  return api.patch({ ...data, id }, defaultConfig).then((data) => data);
}

function addSubscriber(data) {
  defaultConfig.headers = {
    "Content-type": "application/json"
  };
  return api.post(JSON.stringify(data), defaultConfig).then((data) => data);
}

function deleteSubscribers(data) {
  return api._delete(data, defaultConfig).then((data) => data.records);
}

updateSubscriber.proptypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
addSubscriber.proptypes = PropTypes.shape({
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
});
deleteSubscribers.proptypes = PropTypes.array.isRequired;
export { fetchSubscribers, updateSubscriber, addSubscriber, deleteSubscribers };
