import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import authReducer from "./auth/slice";
import filtersReducer from "./filters/slice";
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

const persistConfigContacts = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};
const persistConfigFilters = {
  key: "filters",
  storage,
  whitelist: ["name"],
};
const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const pContactsReducer = persistReducer(persistConfigContacts, contactsReducer);
const pFiltersReducer = persistReducer(persistConfigFilters, filtersReducer);
const pAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
  reducer: {
    contacts: pContactsReducer,
    filters: pFiltersReducer,
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
