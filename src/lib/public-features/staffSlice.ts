import { IStaff } from "@/app/models/IStaff";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface StaffState {
  staff: IStaff[];
  status: "idle" | "loading" | "failed";
}

const initialState: StaffState = {
  staff: [],
  status: "idle",
};

export const allStaffFetch = createAsyncThunk<IStaff[], string>("fetch-staff", async (nonce, { rejectWithValue }) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/all", {
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
    return rejectWithValue("Network Error");
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
        state.staff = action.payload;
      })
      .addCase(allStaffFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default staffSlice.reducer;
