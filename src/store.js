import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './components/subscribersSlice';

export default configureStore({
  reducer:{
    subscribers: subscribersReducer
  }
});