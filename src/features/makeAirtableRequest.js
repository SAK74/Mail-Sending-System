import PropTypes from "prop-types";
import api from "../api";
// const baseURL = "https://enjt82akgm9zoei.m.pipedream.net";
const airtableURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/subscribers";
const defaultConfig = {
  baseURL: airtableURL,
  // url: "/recWNYFeg6RSWXsd7",
  headers: { Authorization: "Bearer keyJIPhmgqhBPjHK9" }
};

function fetchData() {
  return api.get(defaultConfig).then((data) => data.records);
}

function updateData(id, data) {
  defaultConfig.url = `/${id}`;
  return api.patch(data, defaultConfig).then((data) => console.log(data));
}
updateData.proptypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
export { fetchData, updateData };
