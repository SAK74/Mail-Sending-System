import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../features/makeAirtableRequest";
const fetchMails = fetchData("mails");

const mailsAdapter = createEntityAdapter({
   sortComparer: (a, b) => a.createdTime.localeCompare(b.createdTime)
});
const initialState = mailsAdapter.getInitialState({
   status: "iddle",
   error: null
})
const mailsSlice = createSlice({
   name: "mails",
   initialState,
   reducers: {

   },
   extraReducers: {
      [fetchMails.pending]: state => { state.status = "loading" },
      [fetchMails.fulfilled]: (state, { payload }) => {
         state.status = "iddle";
         mailsAdapter.setAll(state, payload);
      },
      [fetchMails.rejected]: (state, { error }) => {
         state.status = "failed";
         state.error = error.message;
      }
   }
});

export default mailsSlice.reducer;
export const { } = mailsSlice.actions;
export const {
   selectAll: selectAllMails,
   selectById: selectMailById
} = mailsAdapter.getSelectors(state => state.mails);