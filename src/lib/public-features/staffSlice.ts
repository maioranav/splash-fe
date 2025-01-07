import { IStaff } from "@/app/models/IStaff";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: [] as IStaff[],
  status: "idle",
};

export const allStaffFetch = createAsyncThunk("fetch-staff", async (nonce: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/all", {
      headers: { "x-fe-nonce": nonce },
    });
    if (response.ok) {
      const data: IStaff[] = await response.json();
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

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allStaffFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allStaffFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.staff = action.payload as IStaff[];
      })
      .addCase(allStaffFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default staffSlice;
