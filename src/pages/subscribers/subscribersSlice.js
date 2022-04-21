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
    updateSubscriber: (state, { payload: { id, ...rest } }) => {
      subscribersAdapter.updateOne(state, {
        id,
        changes: { ...rest }
      });
    },
    _addSubscriber: (state, { payload }) =>
      subscribersAdapter.addOne(state, payload),
    _deleteSubscribers: (state, { payload }) =>
      subscribersAdapter.removeMany(state, payload),
    setStatusSubscr: (state, { payload }) => { state.status = payload },
    setError: (state, { payload }) => { state.error = payload }
  },
  extraReducers: {
    [fetchSubscribers.pending]: (state) => {
      state.status = "pending";
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
  setStatusSubscr,
  updateSubscriber,
  _addSubscriber,
  _deleteSubscribers,
  setError
} = subscribersSlice.actions;
export const { selectAll, selectById } = subscribersAdapter.getSelectors(
  (state) => state.subscribers
);

export default subscribersSlice.reducer;
