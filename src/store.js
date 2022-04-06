import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';

export default configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer
  }
});