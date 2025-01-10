import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const clearNonce = createAction("CLEAR_NONCE");

const initialState = {
  nonce: "",
  status: "idle",
};

interface INonce {
  id: string;
  title: string;
  data: string;
}

export const feNonceFetch = createAsyncThunk("fetch-nonce", async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/main/title/FRONTEND SECRET NONCE");
    if (response.ok) {
      const data: INonce = await response.json();
      return data.data;
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

const nonceSlice = createSlice({
  name: "nonce",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feNonceFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(feNonceFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.nonce = action.payload as string;
      })
      .addCase(feNonceFetch.rejected, (state) => {
        state.status = "failed";
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(clearNonce, (state) => (state = initialState));
  },
});

export default nonceSlice;
