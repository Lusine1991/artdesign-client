import { createSlice } from "@reduxjs/toolkit";
import { getAbout } from "./thunks";
import { AboutData } from "./type";

interface AboutState {
  about: AboutData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  about: null,
  loading: false,
  error: null
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.about = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAbout.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка загрузки данных';
        state.loading = false;
      });
  }
});

export default aboutSlice.reducer;