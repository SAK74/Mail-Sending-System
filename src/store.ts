import { configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';
import snackReducer from './pages/snackBars/snackBarSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import loginReducer from './pages/loggin/logginSlice';

const persistConfig = {
  key: 'loggin',
  storage
}

const store = configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer,
    snackBar: snackReducer,
    loggin: persistReducer(persistConfig, loginReducer)
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
export type ReduxState = ReturnType<typeof store.getState>;
export const useReduxDispatch = () => useDispatch<typeof store.dispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export const persistor = persistStore(store);