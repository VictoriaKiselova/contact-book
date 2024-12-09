import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contacts/slice";
import authReducer from "./auth/slice";
import filtersReducer from "./filters/slice";

const persistConfigContacts = {
  key: "contacts",
  storage,
  whitelist: [""],
};

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const pContactsReducer = persistReducer(persistConfigContacts, contactsReducer);
const pAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
  reducer: {
    contacts: pContactsReducer,
    filters: filtersReducer,
    auth: pAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
