import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPodcast } from "@/app/models/IPodcast";

interface PodcastState {
  podcasts: IPodcast[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: PodcastState = {
  podcasts: [],
  status: "idle",
  error: null,
};

export const allPodcastsFetch = createAsyncThunk("podcast/fetchAll", async (nonce: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/podcast", {
    headers: { "x-fe-nonce": nonce },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
});

export const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allPodcastsFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allPodcastsFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.podcasts = action.payload;
      })
      .addCase(allPodcastsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default podcastSlice.reducer;
