import nonceSlice from "./public-features/nonceSlice";
import staffSlice from "./public-features/staffSlice";
import showSlice from "./public-features/showSlice";
import loginSlice from "./admin-features/loginSlice";
import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices({
  nonce: nonceSlice,
  staff: staffSlice,
  shows: showSlice,
  login: loginSlice,
});
