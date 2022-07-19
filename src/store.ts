import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';
import snackReducer from './pages/snackBars/snackBarSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer,
    snackBar: snackReducer
  }
});

export default store;
export type ReduxState = ReturnType<typeof store.getState>;
export const useReduxDispatch = () => useDispatch<typeof store.dispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;