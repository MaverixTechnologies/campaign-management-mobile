import { useEffect, useState } from "react";
import { apiClient } from "../lib/axios";
// import { useToast } from "native-base";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux
import { useDispatch } from "react-redux";
import { logout, setToken } from "../lib/redux/reducers/authReducer";
// const { manifest } = Constants;

// const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
export default function useAxiosConfig() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Request interceptor to attach the token to the headers
    const requestInterceptor = apiClient.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh and errors
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = await AsyncStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await apiClient.post("/api/token/refresh", {
                refresh: refreshToken,
              });

              const newToken = response.data.access;
              await AsyncStorage.setItem("token", newToken);

              dispatch(setToken(newToken));

              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            } catch (error) {
              // Token refresh failed, log out the user
              dispatch(logout());
            }
          } else {
            // Refresh token not found, log out the user
            dispatch(logout());
          }
        }

        // Display error message in an Alert
        Alert.alert("Error", error.message);

        return Promise.reject(error);
      }
    );
    setLoadingComplete(true);
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);

  return isLoadingComplete;
}
