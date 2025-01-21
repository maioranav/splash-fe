import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const clearNonce = createAction("CLEAR_NONCE");

export interface NonceState {
  nonce: string;
  status: "idle" | "loading" | "failed";
}

const initialState: NonceState = {
  nonce: "",
  status: "idle",
};

interface INonce {
  id: string;
  title: string;
  data: string;
}

export const feNonceFetch = createAsyncThunk<string, void>("fetch-nonce", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/main/title/FRONTEND SECRET NONCE`);
    if (response.ok) {
      const data: INonce = await response.json();
      return data.data;
    } else {
      const res = await response.json();
      return rejectWithValue(res.message);
    }
  } catch (error) {
    console.error("Error fetching nonce:", error);
    return rejectWithValue("Network error");
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
      .addCase(clearNonce, (state) => {
        state.nonce = initialState.nonce;
        state.status = initialState.status;
      });
  },
});

export default nonceSlice.reducer;
