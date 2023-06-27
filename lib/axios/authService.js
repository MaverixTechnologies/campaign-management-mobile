// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { setUser, setToken, reset } from "./reducers/authReducer";

// export const login = async (email, password, rememberMe) => {
//   try {
//     const response = await axios.post("/login", { email, password });

//     const { token, refreshToken, user } = response.data;

//     if (rememberMe) {
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("refreshToken", refreshToken);
//     }

//     dispatch(setToken(token));
//     dispatch(setUser(user));

//     // Redirect or perform other actions upon successful login
//     // ...
//   } catch (error) {
//     // Handle login error
//     // ...
//   }
// };

// export const logout = async () => {
//   try {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("refreshToken");
//     dispatch(reset());

//     // Redirect or perform other actions upon successful logout
//     // ...
//   } catch (error) {
//     // Handle logout error
//     // ...
//   }
// };

// export const refreshToken = async () => {
//   try {
//     const refreshToken = await AsyncStorage.getItem("refreshToken");

//     const response = await axios.post("/refresh-token", { refreshToken });

//     const { token } = response.data;

//     await AsyncStorage.setItem("token", token);

//     dispatch(setToken(token));

//     // Redirect or perform other actions upon successful token refresh
//     // ...
//   } catch (error) {
//     // Handle token refresh error
//     // ...
//   }
// };

// export const initializeAuth = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token");

//     if (token) {
//       dispatch(setToken(token));
//     }

//     // Redirect or perform other actions upon successful initialization
//     // ...
//   } catch (error) {
//     // Handle initialization error
//     // ...
//   }
// };
