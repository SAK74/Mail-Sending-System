import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../services/makeAirtableRequest";
import { ReduxState } from "../../store";
import { Subscriber } from "../../types";

const fetchSubscribers = fetchData<Subscriber>("subscribers");

const subscribersAdapter = createEntityAdapter<Subscriber>({
  sortComparer: (a, b) => a.createdTime.localeCompare(b.createdTime)
});
const initialState = subscribersAdapter.getInitialState<{
  status: "iddle" | 'pending' | 'complete' | "failed",
  error: null | string 
}>({
  status: "iddle",
  error: null
});
const subscribersSlice = createSlice({
  name: "subscribers",
  initialState,
  reducers: {
    updateSubscriber: (state, { payload: { id, ...rest } }: PayloadAction<Subscriber>) => {
      subscribersAdapter.updateOne(state, {
        id,
        changes: { ...rest }
      });
    },
    _addSubscriber: (state, { payload }: PayloadAction<Subscriber>) =>
      subscribersAdapter.addOne(state, payload),
    _deleteSubscribers: (state, { payload }: PayloadAction<string[]>) =>
      subscribersAdapter.removeMany(state, payload),
    setStatusSubscr: (state, { payload }: PayloadAction<typeof state['status']>) => { state.status = payload },
    setError: (state, { payload }: PayloadAction<string>) => { state.error = payload }
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchSubscribers.pending, state => { state.status = "pending" })
  //     .addCase(fetchSubscribers.fulfilled, (state, { payload }) => {
  //       state.status = "iddle";
  //       subscribersAdapter.setAll(state, payload);
  //     })
  //     .addCase(fetchSubscribers.rejected, (state, { error, payload }) => {
  //       console.log("type error: ", typeof error.message);
  //       state.status = "failed";
  //       state.error = error.message;
  //     });
  // }

  // or
  extraReducers: {
    [fetchSubscribers.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchSubscribers.fulfilled.type]: (state, { payload }) => {
      state.status = "iddle";
      subscribersAdapter.setAll(state, payload);
    },
    [fetchSubscribers.rejected.type]: (state, { error, payload }) => {
      state.status = "failed";
      state.error = `Subscribers: ${error.message}`;
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
export const { selectAll, selectById } = subscribersAdapter.getSelectors<ReduxState>(
  (state) => state.subscribers
);

export default subscribersSlice.reducer;
