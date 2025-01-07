import { loginDTO } from "@/app/models/login.dto";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cleanToken = createAction("CLEAN_TOKEN");

const initialState = {
  token: "" as string,
  status: "idle",
};

export const myTokenFetch = createAsyncThunk("fetch-token", async ({ username, password, gRecaptcha }: loginDTO) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "g-recaptcha-token": gRecaptcha || "" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.token as string;
    } else {
      const res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
});

const loginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myTokenFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(myTokenFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload as string;
      })
      .addCase(myTokenFetch.rejected, (state) => {
        state.status = "failed";
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(cleanToken, (state) => (state = initialState));
  },
});

export default loginSlice;
