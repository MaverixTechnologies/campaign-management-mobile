import axios from "axios";
import Constants from "expo-constants";
const inProduction = process.env.NODE_ENV === "production";
const inExpo = Constants.manifest && Constants.manifest.debuggerHost;
const inBrowser = typeof document !== "undefined";
const apiAndpoint = "https://cms-dev-k8pz.onrender.com";
// const apiAndpoint = "https://cmsdev-production.up.railway.app";
// const localAndpoint = "http://127.0.0.1:8000/";
// const apiAndpoint = "https://campaign-management-backend-production.up.railway.app"
export const apiDomain = inProduction
  ? // ? process.env?.API_ENDPOINT
    apiAndpoint
  : inExpo
  ? apiAndpoint
  : inBrowser
  ? apiAndpoint
  : apiAndpoint;
// const protocol = inProduction ? "https" : "http";
const apiUrl = `${apiDomain}`;
console.log("apiUrl:", apiUrl);
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

export default apiClient;
