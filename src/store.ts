import {   configureStore } from "@reduxjs/toolkit";
import subscribersReducer from './pages/subscribers/subscribersSlice';
import mailsReducer from './pages/mails/mailsSlice';
import snackReducer from './pages/snackBars/snackBarSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PERSIST, PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import loginReducer from './pages/loggin/logginSlice';

const loginPersistConfig:PersistConfig<any> = {
  key: 'login',
  storage
}
// const rootReducer = combineReducers({
//   subscribers: subscribersReducer,
//   mails: mailsReducer,
//   loggin: persistReducer(loginPersistConfig, loginReducer)
// });
// export type RootStateType = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: {
    subscribers: subscribersReducer,
    mails: mailsReducer,
    snackBar: snackReducer,
    loggin: persistReducer<ReturnType<typeof loginReducer>>(loginPersistConfig, loginReducer)
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST]
    }
  })
});

export default store;
export type ReduxState = ReturnType<typeof store.getState>;
export const useReduxDispatch = () => useDispatch<typeof store.dispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export const persistor = persistStore(store);