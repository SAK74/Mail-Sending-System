import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
   name: "snackBar",
   initialState: {
      open: false,
      message: "",
      type: "info"
   },
   reducers: {
      showSnack: (state, { payload: { message, type } }) => {
         state.open = true;
         state.message = message;
         state.type = type;
      },
      hideSnack: state => { state.open = false }

   }
});

export default snackBarSlice.reducer;
export const { showSnack, hideSnack } = snackBarSlice.actions;