import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../features/makeAirtableRequest";
const fetchMails = fetchData("mails");

const mailsAdapter = createEntityAdapter({
   sortComparer: (a, b) => a.createdTime.localeCompare(b.createdTime)
});
const initialState = mailsAdapter.getInitialState({
   status: "iddle",
   error: null,
   openModal: false
})
const mailsSlice = createSlice({
   name: "mails",
   initialState,
   reducers: {
      updateMail: (state, { payload: { id, ...rest } }) => mailsAdapter.updateOne(state, {
         id,
         changes: { ...rest }
      }),
      deleteMails: (state, { payload }) => mailsAdapter.removeMany(state, payload),
      addMail: (state, { payload }) => mailsAdapter.addOne(state, payload),
      setStatusMails: (state, { payload }) => { state.status = payload },
      setStatusEditor: (state, { payload }) => { state.openModal = payload }
   },
   extraReducers: {
      [fetchMails.pending]: state => { state.status = "pending" },
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
export const { updateMail, deleteMails, setStatusMails, setStatusEditor, addMail } = mailsSlice.actions;
export const {
   selectAll: selectAllMails,
   selectById: selectMailById
} = mailsAdapter.getSelectors(state => state.mails);