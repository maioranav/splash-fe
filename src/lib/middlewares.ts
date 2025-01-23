import { Action, Middleware, ThunkDispatch } from "@reduxjs/toolkit";
import { myTokenValidate } from "./admin-features/loginSlice";
import { persistedReducer } from "./store";

export type RootState = ReturnType<typeof persistedReducer>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const rehydrateMiddleware: Middleware<{}, RootState, ThunkDispatch<RootState, void, Action>> = (store) => (next) => async (action) => {
  if ((action as Action).type === "persist/REHYDRATE") {
    const state = store.getState();
    const token = state.login?.token;

    if (token) {
      try {
        await store.dispatch(myTokenValidate(token)).unwrap();
      } catch (error) {
        console.error("Token validation failed:", error);
      }
    }
  }
  return next(action);
};
