import { IShow } from "@/app/models/IShow";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ShowState {
  shows: IShow[];
  status: "idle" | "loading" | "failed";
}

const initialState: ShowState = {
  shows: [],
  status: "idle",
};

export const allShowsFetch = createAsyncThunk<IShow[], string>("fetch-shows", async (nonce, { rejectWithValue }) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/all", {
      headers: { "x-fe-nonce": nonce },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const res = await response.json();
      console.log(res.message);
      return rejectWithValue(res.message);
    }
  } catch (error) {
    console.error(error);
    return rejectWithValue("Network error");
  }
});

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allShowsFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allShowsFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.shows = action.payload;
      })
      .addCase(allShowsFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default showSlice.reducer;
