// import { formToJSON } from "axios";
import http from "./http";

class ApiService {
  // Authentication

  signin(data) {
    return http.post("/api/token/", data);
  }
  refresh(data) {
    return http.post("/api/token/refresh", data);
  }

  // users
  getUsers() {
    return http.get("/account/api/v1/user");
  }
  getUser(id) {
    return http.get(`/account/api/v1/user/${id}/`);
  }
  updateUser(data) {
    return http.post("/account/api/v1/user/update", data);
  }
  getProfile() {
    return http.get("/campaign_agent/api/v2/Profile/");
  }

  getDashboard() {
    return http.get("/campaign_agent/api/v2/agent/dashboard/");
  }

  // MLAs
  addMLA(data) {
    return http.post("/campaign_agent/api/v1/MLA/", data);
  }
  getMLAs() {
    return http.get("/campaign_agent/api/v1/MLA/");
  }
  getMLA(id) {
    return http.get(`/campaign_agent/api/v1/MLA/${id}/`);
  }

  updateMLA(data, id) {
    return http.patch(`/campaign_agent/api/v1/MLA/${id}/`, data);
  }
  deleteMLA(id) {
    return http.delete(`/campaign_agent/api/v1/MLA/${id}/`);
  }
  getMLADashboard(id) {
    return http.get(`/campaign_zone/api/v2/Vidhansabha/dashboard/${id}/`);
  }

  // MandalIncharge

  addMandalIncharge(data) {
    return http.post("/campaign_agent/api/v1/MandalIncharge/", data);
  }
  getMandalIncharges(key, id) {
    if (key && id) {
      const formdata = { [key]: id };
      const data = { filters: JSON.stringify(formdata) };
      return http.post(`/campaign_agent/api/v2/MandalIncharge/`, data);
      // return http.get(`/campaign_agent/api/v2/MandalIncharge/?${key}=${id}`);
    } else {
      return http.get(`/campaign_agent/api/v2/MandalIncharge/`);
    }
  }
  getMandalIncharge(id) {
    return http.get(`/campaign_agent/api/v2/MandalIncharge/${id}/`);
  }

  updateMandalIncharge(data, id) {
    return http.patch(`/campaign_agent/api/v1/MandalIncharge/${id}/`, data);
  }
  deleteMandalIncharge(id) {
    return http.delete(`/campaign_agent/api/v1/MandalIncharge/${id}/`);
  }
  getMandalDashboard(id) {
    return http.get(`/campaign_zone/api/v2/Mandal/dashboard/${id}/`);
  }

  // SectorIncharge

  addSectorIncharge(data) {
    return http.post("/campaign_agent/api/v1/SectorIncharge/", data);
  }
  getSectorIncharges(key, id) {
    // console.log("PARAMAS :", key + "   " + id);
    if (key && id) {
      const formdata = {
        [key]: id,
      };
      // console.log("formdata ", formdata);
      const data = { filters: JSON.stringify(formdata) };
      return http.post(`/campaign_agent/api/v2/SectorIncharge/`, data);
      // return http.get(`/campaign_agent/api/v2/SectorIncharge/?${key}=${id}`);
    } else {
      return http.get("/campaign_agent/api/v2/SectorIncharge/");
    }
  }
  getSectorIncharge(id) {
    return http.get(`/campaign_agent/api/v2/SectorIncharge/${id}/`);
  }

  updateSectorIncharge(data, id) {
    return http.patch(`/campaign_agent/api/v2/SectorIncharge/${id}/`, data);
  }
  deleteSectorIncharge(id) {
    return http.delete(`/campaign_agent/api/v2/SectorIncharge/${id}/`);
  }
  getSectorDashboard(id) {
    return http.get(`/campaign_zone/api/v2/Sector/dashboard/${id}/`);
  }

  // BoothCoordinator

  addBoothCoordinator(data) {
    return http.post("/campaign_agent/api/v2/BoothCoordinator/", data);
  }
  getBoothCoordinators() {
    return http.get("/campaign_agent/api/v2/BoothCoordinator/");
  }
  getBoothCoordinator(id) {
    return http.get(`/campaign_agent/api/v2/BoothCoordinator/${id}/`);
  }

  updateBoothCoordinator(data, id) {
    return http.patch(`/campaign_agent/api/v2/BoothCoordinator/${id}/`, data);
  }
  deleteBoothCoordinator(id) {
    return http.delete(`/campaign_agent/api/v2/BoothCoordinator/${id}/`);
  }
  getBoothDashboard(id) {
    return http.get(`/campaign_zone/api/v2/PollingBooth/dashboard/${id}/`);
  }
  // BoothLevelAgent

  addBoothLevelAgent(data) {
    return http.post("/campaign_agent/api/v2/BoothLevelAgent/", data);
  }
  getBoothLevelAgents(key, id) {
    if (key && id) {
      const formdata = { [key]: id };
      const data = { filters: JSON.stringify(formdata) };
      return http.post(`/campaign_agent/api/v2/BoothLevelAgent/`, data);
      // return http.get(`/campaign_agent/api/v2/BoothLevelAgent/?${key}=${id}`);
    } else {
      return http.get(`/campaign_agent/api/v2/BoothLevelAgent/`);
    }
  }
  getBoothLevelAgent(id) {
    return http.get(`/campaign_agent/api/v2/BoothLevelAgent/${id}/`);
  }

  updateBoothLevelAgent(data, id) {
    return http.patch(`/campaign_agent/api/v2/BoothLevelAgent/${id}/`, data);
  }
  deleteBoothLevelAgent(id) {
    return http.delete(`/campaign_agent/api/v2/BoothLevelAgent/${id}/`);
  }
  // getMLADashboard() {
  //   return http.get("/campaign_agent/api/v2/MLA/dashboard");
  // }
  // PollingAgent

  addPollingAgent(data) {
    return http.post("/campaign_agent/api/v2/PollingAgent/", data);
  }
  getPollingAgents(key, id) {
    if (key && id) {
      const formdata = { [key]: id };
      const data = { filters: JSON.stringify(formdata) };
      return http.post(`/campaign_agent/api/v2/PollingAgent/`, data);
      // return http.get(`/campaign_agent/api/v2/PollingAgent/?${key}=${id}`);
    } else {
      return http.get(`/campaign_agent/api/v2/PollingAgent/`);
    }
  }
  getPollingAgent(id) {
    return http.get(`/campaign_agent/api/v2/PollingAgent/${id}/`);
  }

  updatePollingAgent(data, id) {
    return http.patch(`/campaign_agent/api/v2/PollingAgent/${id}/`, data);
  }
  deletePollingAgent(id) {
    return http.delete(`/campaign_agent/api/v2/PollingAgent/${id}/`);
  }
  getPADashboard() {
    return http.get("/campaign_agent/api/v2/agent/dashboard");
  }

  // Voters
  addVoter(data) {
    return http.post("/campaign_agent/api/v2/Voter/", data);
  }
  getVoters() {
    return http.get("/campaign_agent/api/v2/Voter/");
  }
  getVoter(id) {
    return http.get(`/campaign_agent/api/v2/Voter/${id}/`);
  }

  updateVoter(data, id) {
    return http.patch(`/campaign_agent/api/v2/Voter/${id}/`, data);
  }
  deleteVoter(id) {
    return http.delete(`/campaign_agent/api/v2/Voter/${id}/`);
  }

  // State
  getState(id) {
    return http.get(`/campaign_zone/api/v1/State/${id}/`);
  }
  getStates() {
    return http.get("/campaign_zone/api/v1/State/");
  }

  // Vidhansabha
  getVidhansabha(id) {
    return http.get(`/campaign_zone/api/v2/Vidhansabha/${id}/`);
  }
  getVidhansabhas() {
    return http.get("/campaign_zone/api/v2/Vidhansabha/");
  }
  // Loksabha
  getLoksabha(id) {
    return http.get(`/campaign_zone/api/v2/Loksabha/${id}/`);
  }
  getLoksabhas() {
    return http.get("/campaign_zone/api/v2/Loksabha/");
  }
  // Mandals

  getMandal(id) {
    return http.get(`/campaign_zone/api/v2/Mandal/${id}/`);
  }
  getMandals() {
    return http.get("/campaign_zone/api/v2/Mandal/");
  }

  // Sectors
  getSector(id) {
    return http.get(`/campaign_zone/api/v2/Sector/${id}/`);
  }
  getSectors() {
    return http.get("/campaign_zone/api/v2/Sector/");
  }

  // PollingBooth
  getBooth(id) {
    return http.get(`/campaign_zone/api/v2/PollingBooth/${id}/`);
  }
  getBooths() {
    return http.get("/campaign_zone/api/v2/PollingBooth/");
  }

  // filterVoters(data) {
  //   return http.post(`/campaign_agent/api/v2/Voters/filter/`, data);
  // }
  filterVoters(data, page) {
    return http.post(
      `/campaign_agent/api/v2/Voters/filter/?page=${page}`,
      data
    );
  }
  votersStats(data) {
    return http.post(`/campaign_agent/api/v2/Voters/stats/`, data);
  }
  getEnums() {
    return http.get("/campaign_agent/api/v2/Voters/enums/");
  }
}

export default new ApiService();
