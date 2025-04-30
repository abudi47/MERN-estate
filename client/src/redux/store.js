import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [
    {
      in: (state) => {
        // Add a timestamp when persisting the state
        return { ...state, _persistedAt: Date.now() };
      },
      out: (state) => {
        // Check if the state has expired
        const expireTime = 14400 * 1000; // 1 hour in milliseconds
        if (Date.now() - state._persistedAt > expireTime) {
          return {}; // Return an empty state if expired
        }
        return state;
      },
    },
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
