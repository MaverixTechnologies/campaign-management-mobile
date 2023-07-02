import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistor } from "../store";
// import { login } from '../services/authService';
import { ApiService } from "../../axios";

const initialState = {
  user: undefined,
  userProfile: undefined,
  userId: undefined,
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,
  loginInfo: {
    email: "",
    password: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    // resetAuthData: (state) => {
    //   state.user = undefined;
    //   state.token = undefined;
    //   // Clear the token from AsyncStorage
    //   // await AsyncStorage.removeItem("persist:root");
    // },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoginInfo(state, action) {
      state.loginInfo = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const loginAction = (credentials) => async (dispatch) => {
  try {
    const response = await ApiService.signin(credentials);
    const { access, refresh } = response.data;

    await AsyncStorage.setItem("token", access);
    await AsyncStorage.setItem("refreshToken", refresh);

    dispatch(setToken(access));
  } catch (error) {
    console.error("Login failed:", error.message);
    // Handle error and display appropriate message
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");

    dispatch(logout());
  } catch (error) {
    console.error("Logout failed:", error.message);
    // Handle error and display appropriate message
  }
};

export const {
  reset,
  // resetAuthData,
  setUser,
  setToken,
  setLoginInfo,
  setUserId,
  setUserProfile,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
