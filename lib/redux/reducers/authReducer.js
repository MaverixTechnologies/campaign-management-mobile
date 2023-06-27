import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistor } from "../store";
const initialState = {
  user: undefined,
  userProfile: undefined,
  token: undefined,
  userId: undefined,
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
    resetAuthData: (state) => {
      state.user = undefined;
      state.token = undefined;
      // Clear the token from AsyncStorage
      // await AsyncStorage.removeItem("persist:root");
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoginInfo(state, action) {
      state.loginInfo = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const {
  reset,
  resetAuthData,
  setUser,
  setToken,
  setLoginInfo,
  setUserId,
  setUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
