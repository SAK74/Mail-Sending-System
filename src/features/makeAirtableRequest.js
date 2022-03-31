import { createAsyncThunk } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import api from "../api";
// const baseURL = "https://enjt82akgm9zoei.m.pipedream.net";
const airtableURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/subscribers";
const defaultConfig = {
  baseURL: airtableURL,
  // url: "/recWNYFeg6RSWXsd7",
  headers: { Authorization: "Bearer keyJIPhmgqhBPjHK9" }
};

const fetchSubscribers = createAsyncThunk("fetchSubscribers", () =>
  api.get(defaultConfig).then((data) => data.records)
);

function updateSubscriber(id, data) {
  defaultConfig.url = `/${id}`;
  return api.patch(data, defaultConfig).then((data) => data);
}

function addSubscriber(data) {
  defaultConfig.url = "";
  return api.post(data, defaultConfig).then((data) => data);
}

function deleteSubscribers(data) {
  defaultConfig.url = "";
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
