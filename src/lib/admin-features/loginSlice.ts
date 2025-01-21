import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginDTO } from "@/app/models/login.dto";

export const cleanToken = createAction("CLEAN_TOKEN");

export interface LoginState {
  token: string;
  status: "idle" | "loading" | "failed"; // Usa un tipo union per gli stati possibili
}

const initialState: LoginState = {
  token: "" as string,
  status: "idle",
};

export const myTokenFetch = createAsyncThunk<string, loginDTO>(
  "fetch-token",
  async ({ username, password, gRecaptcha }: loginDTO, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "g-recaptcha-token": gRecaptcha || "" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        return data.token;
      } else {
        const res = await response.json();
        return rejectWithValue(res.message);
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Network error");
    }
  }
);

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
      .addCase(cleanToken, (state) => {
        state.token = initialState.token;
        state.status = initialState.status;
      });
  },
});

export default loginSlice.reducer;
