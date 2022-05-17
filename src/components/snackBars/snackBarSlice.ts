import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: {
   open: boolean,
   message: string,
   type: "info" | "error"
} = {
   open: false,
   message: "",
   type: "info"
}
const snackBarSlice = createSlice({
   name: "snackBar",
   initialState,
   reducers: {
      showSnack: (state, { payload: { message, type } }: PayloadAction<{ message: string, type: "info" | "error" }>) => {
         state.open = true;
         state.message = message;
         state.type = type;
      },
      hideSnack: state => { state.open = false }

   }
});

export default snackBarSlice.reducer;
export const { showSnack, hideSnack } = snackBarSlice.actions;