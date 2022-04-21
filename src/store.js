import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';
import snackReducer from './components/snackBar/snackBarSlice';

export default configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer,
    snackBar: snackReducer
  }
});