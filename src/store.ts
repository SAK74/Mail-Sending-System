import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';
import snackReducer from './components/snackBars/snackBarSlice';

const store = configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer,
    snackBar: snackReducer
  }
});

export default store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;