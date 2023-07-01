import axios from "axios";
import Constants from "expo-constants";
const inProduction = process.env.NODE_ENV === "production";
const inExpo = Constants.manifest && Constants.manifest.debuggerHost;
const inBrowser = typeof document !== "undefined";
export const apiDomain = inProduction
  ? // ? process.env?.API_ENDPOINT
    "https://campaign-management-backend-production.up.railway.app"
  : inExpo
  ? "https://campaign-management-backend-production.up.railway.app"
  : inBrowser
  ? "https://campaign-management-backend-production.up.railway.app"
  : "https://campaign-management-backend-production.up.railway.app";
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
