import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    isLogged: boolean;
    userName?: string ;
    token?: string;
} = {
    isLogged: false,
    // userName: "",
    // token: undefined
}


const logginSlice = createSlice({
    initialState,
    name: "loggin",
    reducers:{
        setLogged: (state, {payload:{token}}: PayloadAction<{token: string}>) => {
            state.isLogged = true;
            state.token = token;
        },
        setUser: (state, {payload}: PayloadAction<string>) => {state.userName = payload},
        // setToken: (state, {payload}: PayloadAction<string>) => {state.userName = payload},
        setUnlogged: (state) => {
            state.isLogged = false;
            state.token = undefined;
        }
    }
});

export default logginSlice.reducer;
export const {setLogged, setUnlogged} = logginSlice.actions;