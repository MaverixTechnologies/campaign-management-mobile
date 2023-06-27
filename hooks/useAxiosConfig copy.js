import { apiClient, ApiService } from "../lib/axios";
import { useToast } from "native-base";
// redux
import { useDispatch, useSelector } from "react-redux";
import { resetAuthData, setToken } from "../lib/redux/reducers/authReducer";
import { useEffect, useState } from "react";
// const { manifest } = Constants;

// const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
export default function usePusherNotification() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    const initActionOfTokenExpired = () => {
      // Set auth token
      apiClient.interceptors.request.use((config) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token.access}`;
        }
        return config;
      });
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          if (error.response && error.response.status === 401) {
            // Token expired, refresh the token
            try {
              const refreshedToken = await ApiService.refreshToken(
                token.refresh
              ); // Call a function to refresh the token
              dispatch(setToken(refreshedToken)); // Update the token in the Redux store
              // Retry the failed request with the new token
              error.config.headers.Authorization = `Bearer ${refreshedToken.access}`;
              return apiClient.request(error.config);
            } catch (refreshError) {
              // Failed to refresh token, sign out the user
              dispatch(resetAuthData());
              toast.show({
                title: "Error",
                placement: "top",
                description: "Failed to refresh token.",
              });
            }
          }
          return Promise.reject(error);
        }
      );

      setLoadingComplete(true);
    };
    initActionOfTokenExpired();
  }, []);

  return isLoadingComplete;
}
