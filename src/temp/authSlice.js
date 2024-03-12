import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils";
import { STORAGE_KEY } from "../constant";

export const login = createAsyncThunk("users/login", async (data, thunkAPI) => {
  return null;
});

export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    return null;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isShowLoginPage: false,
    current: JSON.parse(getLocalStorage(STORAGE_KEY.USER)) || null,
  },
  reducers: {
    showLoginPage: (state) => {},
    hideLoginPage: (state) => {},
    logout: (state) => {},
    createSaveBlog: (state, action) => {},
    removeSaveBlog: (state, action) => {},
    createReview: (state, action) => {},
    toggleFollower: (state, action) => {},
    updateUser: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
