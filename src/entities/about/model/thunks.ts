import { createAsyncThunk } from "@reduxjs/toolkit";
import AboutService from "../api/AboutService";



export const getAbout = createAsyncThunk('about/getAbout', async () => {
  const about = await AboutService.getAbout();
  return about;
});
