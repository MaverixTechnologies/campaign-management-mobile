import { apiClient } from "../lib/axios";
import { useToast } from "native-base";
// redux
import { useDispatch, useSelector } from "react-redux";
import { resetAuthData } from "../lib/redux/reducers/authReducer";
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
        (error) => {
          // If API return 401 not authorized error, then sign-out
          if (error) {
            dispatch(resetAuthData());
            toast.show({
              title: "Error",
              placement: "top",
              description: String(error),
            });
          }
          return error;
        }
      );
      setLoadingComplete(true);
    };
    initActionOfTokenExpired();
  }, []);

  return isLoadingComplete;
}
