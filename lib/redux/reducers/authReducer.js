import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
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
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoginEmail(state, action) {
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
  setLoginEmail,
  setUserId,
} = authSlice.actions;
export default authSlice.reducer;
