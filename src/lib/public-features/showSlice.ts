import { IShow } from "@/app/models/IShow";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  shows: [] as IShow[],
  status: "idle",
};

export const allShowsFetch = createAsyncThunk("fetch-shows", async (nonce: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/all", {
      headers: { "x-fe-nonce": nonce },
    });
    if (response.ok) {
      const data: IShow[] = await response.json();
      return data;
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
        state.shows = action.payload as IShow[];
      })
      .addCase(allShowsFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default showSlice;
