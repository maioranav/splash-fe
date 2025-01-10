"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Persistor } from "redux-persist/lib/types";
import persistStore from "redux-persist/lib/persistStore";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<Persistor>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  if (!persistorRef.current) {
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistorRef.current as Persistor}>{children}</PersistGate>
    </Provider>
  );
}
