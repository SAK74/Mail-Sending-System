import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../features/makeAirtableRequest";
import { ReduxState } from "../../store";
import { Mail } from "../../types";

type OpenModal = boolean | Omit<Mail, "createdTime">;

const fetchMails = fetchData<Mail>("mails");

const mailsAdapter = createEntityAdapter<Mail>({
   sortComparer: (a, b) => a.createdTime.localeCompare(b.createdTime)
});
const initialState = mailsAdapter.getInitialState<{
   status: "iddle" | "pending" | "complete" | "failed",
   error: string | undefined,
   openModal: OpenModal
}>({
   status: "iddle",
   error: undefined,
   openModal: false
})
const mailsSlice = createSlice({
   name: "mails",
   initialState,
   reducers: {
      updateMail: (state, { payload: { id, ...rest } }: PayloadAction<Mail>) =>
         mailsAdapter.updateOne(state, {
            id,
            changes: { ...rest }
         }),
      deleteMails: (state, { payload }: PayloadAction<string[]>) =>
         mailsAdapter.removeMany(state, payload),
      addMail: (state, { payload }: PayloadAction<Mail>) => mailsAdapter.addOne(state, payload),
      setStatusMails: (state, { payload }: PayloadAction<typeof state['status']>) => { state.status = payload },
      setStatusEditor: (state, { payload }: PayloadAction<OpenModal>) => { state.openModal = payload }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchMails.pending, state => { state.status = "pending" })
         .addCase(fetchMails.fulfilled, (state, { payload }) => {
            state.status = "iddle";
            mailsAdapter.setAll(state, payload);
         })
         .addCase(fetchMails.rejected, (state, { error }) => {
            state.status = "failed";
            state.error = error.message;
         });
   }
   // extraReducers:{
   //    [fetchMails.pending.type]: state => { state.status = "pending" },
   //    [fetchMails.fulfilled.type]: (state, { payload }) => {
   //       state.status = "iddle";
   //       mailsAdapter.setAll(state, payload);
   //    },
   //    [fetchMails.rejected.type]: (state, { error }) => {
   //       state.status = "failed";
   //       state.error = error.message;
   //    }
   // }
});

export default mailsSlice.reducer;
export const { updateMail, deleteMails, setStatusMails, setStatusEditor, addMail } = mailsSlice.actions;
export const {
   selectAll: selectAllMails,
   selectById: selectMailById
} = mailsAdapter.getSelectors<ReduxState>(state => state.mails);
