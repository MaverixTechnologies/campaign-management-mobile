import axios from "axios";
import Constants from "expo-constants";
const inProduction = process.env.NODE_ENV === "production";
const inExpo = Constants.manifest && Constants.manifest.debuggerHost;
const inBrowser = typeof document !== "undefined";
export const apiDomain = inProduction
  ? process.env?.API_ENDPOINT
  : inExpo
  ? "https://lazy-wolves-smash.loca.lt"
  : inBrowser
  ? "http://localhost:8000"
  : "unknown";
// const protocol = inProduction ? "https" : "http";
const apiUrl = `${apiDomain}`;
console.log("apiUrl:", apiUrl);
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
