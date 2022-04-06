import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../features/makeAirtableRequest";

const fetchSubscribers = fetchData("subscribers");

const subscribersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdTime.localeCompare(b.createdTime)
});
const initialState = subscribersAdapter.getInitialState({
  status: "iddle",
  error: null
});
const subscribersSlice = createSlice({
  name: "subscribers",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "iddle";
    },
    updateChecked: (state, { payload: { id, ...rest } }) => {
      // console.log(rest.fields);
      subscribersAdapter.updateOne(state, {
        id,
        changes: { ...rest }
      });
    },
    _addSubscriber: (state, { payload }) =>
      subscribersAdapter.addOne(state, payload),
    _deleteSubscribers: (state, { payload }) =>
      subscribersAdapter.removeMany(state, payload)
  },
  extraReducers: {
    [fetchSubscribers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSubscribers.fulfilled]: (state, { payload }) => {
      state.status = "iddle";
      subscribersAdapter.setAll(state, payload);
    },
    [fetchSubscribers.rejected]: (state, { error, payload }) => {
      // console.log(error, payload);
      state.status = "failed";
      state.error = error.message;
    }
  }
});

export const {
  resetStatus,
  updateChecked,
  _addSubscriber,
  _deleteSubscribers
} = subscribersSlice.actions;
export const { selectAll, selectById } = subscribersAdapter.getSelectors(
  (state) => state.subscribers
);

export default subscribersSlice.reducer;
