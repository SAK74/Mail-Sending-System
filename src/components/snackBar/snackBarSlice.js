import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
   name: "snackBar",
   initialState: {
      open: false,
      message: ""
   },
   reducers: {
      showSnack: (state, { payload }) => {
         state.open = true;
         state.message = payload;
      },
      hideSnack: state => { state.open = false }

   }
});

export default snackBarSlice.reducer;
export const { showSnack, hideSnack } = snackBarSlice.actions;