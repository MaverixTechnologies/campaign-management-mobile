/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      // Authentication
      Signin: "sign-in",
      // Dashboard
      Dashboard: "dashboard",
      // Mandal
      Mandals: "mandals",
      AllMandals: "all-mandals",
      AllMandalIncharges: "all-mandal-incharges",
      Mandal: "mandal",
      MandalDashboard: "mandal-info",
      AddMandalIncharge: "add-mandal-incharge",

      // Sector
      Sectors: "sectors",
      SectorIncharges: "sector-incharges",
      SectorDashboard: "sector-info",
      AddSectorIncharge: "add-sector-incharge",
      AllSectorIncharges: "all-sector-incharges",

      // Booth
      Booths: "booths",
      AllBLAs: "all-bla",
      AllPAs: "all-pa",
      // Voter
      AddVoter: "add-voter",
      AllVoters: "all-voters",
      AddNewMember: "add-new-member",
      SearchVoters: "search-voters",

      // Analytics
      VotersAnalytics: "voters-analytics",
      ZoneAnalytics: "Zone-analytics",
      PreviousResults: "Previous-results",
      FilterVoters: "filter-voters",
    },
  },
};
