import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "./storage";
import { rootReducer } from "./rootReducer";
import { rehydrateMiddleware } from "./middlewares";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["login", "nonce"],
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_SECRET_KEY || "generickeysupersecrettotest" })],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rehydrateMiddleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
