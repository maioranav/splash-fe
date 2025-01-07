import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import nonceSlice from "./public-features/nonceSlice";
import staffSlice from "./public-features/staffSlice";
import loginSlice from "./admin-features/loginSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["nonce"],
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_SECRET_KEY || "generickeysupersecrettotest" })],
};

const rootReducer = combineReducers({
  nonce: persistReducer(persistConfig, nonceSlice.reducer),
  staff: persistReducer(persistConfig, staffSlice.reducer),
  login: persistReducer(persistConfig, loginSlice.reducer),
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
