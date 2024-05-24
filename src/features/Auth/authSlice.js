import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../../src/api/usersApi";
import { STORAGE_KEY } from "../../constant";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./../../utils/common";

export const login = createAsyncThunk("users/login", async (data, thunkAPI) => {
  if (!data.email || !data.password) {
    throw new Error("Email & Password must be provided");
  }
  const response = await usersApi.login(data);
  setLocalStorage(STORAGE_KEY.TOKEN, response.token);
  setLocalStorage(STORAGE_KEY.USER, JSON.stringify(response));
  return response;
});

export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    const response = await usersApi.signup(data);
    return null;
  }
);
export const forgotPassword = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    const response = await usersApi.forgotPasswords(data);
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
    showLoginPage: (state) => {
      state.isShowLoginPage = true;
    },
    hideLoginPage: (state) => {
      state.isShowLoginPage = false;
    },
    logout: (state) => {
      removeLocalStorage(STORAGE_KEY.USER);
      removeLocalStorage(STORAGE_KEY.TOKEN);
      state.current = null;
    },
    createSaveBlog: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));

      if (userLocal.blogSaved.includes(action.payload)) return;
      userLocal.blogSaved = [...userLocal.blogSaved, action.payload];
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    removeSaveBlog: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));

      if (!userLocal.blogSaved.includes(action.payload)) return;
      userLocal.blogSaved = userLocal.blogSaved.filter(
        (item) => item !== action.payload
      );
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    createReview: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));
      userLocal.listReviews = [...userLocal?.listReviews, action.payload];
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    toggleFollower: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));
      if (userLocal?.listFollowing?.includes(action.payload.id)) {
        const tempFollowList = userLocal?.listFollowing?.filter(
          (item) => item !== action.payload.id
        );
        userLocal.listFollowing = tempFollowList;
      } else {
        userLocal.listFollowing = [
          ...userLocal?.listFollowing,
          action.payload.id,
        ];
      }
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    updateUser: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));
      userLocal.image = action.payload.avatar;

      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    updateUserNotImage: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));
      userLocal[action.payload.field] = action.payload[action.payload.field];

      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
      state.isShowLoginPage = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.current = action.payload;
      state.isShowLoginPage = false;
    });
  },
});

export const {
  showLoginPage,
  hideLoginPage,
  logout,
  createSaveBlog,
  removeSaveBlog,
  createReview,
  toggleFollower,
  updateUser,
  updateUserNotImage,
} = authSlice.actions;
export default authSlice.reducer;
