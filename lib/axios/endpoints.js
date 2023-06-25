import http from "./http";

class ApiService {
  // Authentication
  signup(data) {
    return http.post("/v1/signup", data);
  }

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

  // MandalIncharge

  addMandalIncharge(data) {
    return http.post("/campaign_agent/api/v1/MandalIncharge/", data);
  }
  getMandalIncharges() {
    return http.get("/campaign_agent/api/v1/MandalIncharge/");
  }
  getMandalIncharge(id) {
    return http.get(`/campaign_agent/api/v1/MandalIncharge/${id}/`);
  }

  updateMandalIncharge(data, id) {
    return http.patch(`/campaign_agent/api/v1/MandalIncharge/${id}/`, data);
  }
  deleteMandalIncharge(id) {
    return http.delete(`/campaign_agent/api/v1/MandalIncharge/${id}/`);
  }
  getMLADashboard() {
    return http.get("/campaign_agent/api/v2/MLA/dashboard");
  }

  // SectorIncharge

  addSectorIncharge(data) {
    return http.post("/campaign_agent/api/v1/SectorIncharge/", data);
  }
  getSectorIncharges() {
    return http.get("/campaign_agent/api/v1/SectorIncharge/");
  }
  getSectorIncharge(id) {
    return http.get(`/campaign_agent/api/v1/SectorIncharge/${id}/`);
  }

  updateSectorIncharge(data, id) {
    return http.patch(`/campaign_agent/api/v1/SectorIncharge/${id}/`, data);
  }
  deleteSectorIncharge(id) {
    return http.delete(`/campaign_agent/api/v1/SectorIncharge/${id}/`);
  }

  // BoothCoordinator

  addBoothCoordinator(data) {
    return http.post("/campaign_agent/api/v1/BoothCoordinator/", data);
  }
  getBoothCoordinators() {
    return http.get("/campaign_agent/api/v1/BoothCoordinator/");
  }
  getBoothCoordinator(id) {
    return http.get(`/campaign_agent/api/v1/BoothCoordinator/${id}/`);
  }

  updateBoothCoordinator(data, id) {
    return http.patch(`/campaign_agent/api/v1/BoothCoordinator/${id}/`, data);
  }
  deleteBoothCoordinator(id) {
    return http.delete(`/campaign_agent/api/v1/BoothCoordinator/${id}/`);
  }

  // BoothLevelAgent

  addBoothLevelAgent(data) {
    return http.post("/campaign_agent/api/v1/BoothLevelAgent/", data);
  }
  getBoothLevelAgents() {
    return http.get("/campaign_agent/api/v1/BoothLevelAgent/");
  }
  getBoothLevelAgent(id) {
    return http.get(`/campaign_agent/api/v1/BoothLevelAgent/${id}/`);
  }

  updateBoothLevelAgent(data, id) {
    return http.patch(`/campaign_agent/api/v1/BoothLevelAgent/${id}/`, data);
  }
  deleteBoothLevelAgent(id) {
    return http.delete(`/campaign_agent/api/v1/BoothLevelAgent/${id}/`);
  }

  // PollingAgent

  addPollingAgent(data) {
    return http.post("/campaign_agent/api/v1/PollingAgent/", data);
  }
  getPollingAgents() {
    return http.get("/campaign_agent/api/v1/PollingAgent/");
  }
  getPollingAgent(id) {
    return http.get(`/campaign_agent/api/v1/PollingAgent/${id}/`);
  }

  updatePollingAgent(data, id) {
    return http.patch(`/campaign_agent/api/v1/PollingAgent/${id}/`, data);
  }
  deletePollingAgent(id) {
    return http.delete(`/campaign_agent/api/v1/PollingAgent/${id}/`);
  }

  // Voters
  addVoter(data) {
    return http.post("/campaign_agent/api/v1/Voter/", data);
  }
  getVoters() {
    return http.get("/campaign_agent/api/v1/Voter/");
  }
  getVoter(id) {
    return http.get(`/campaign_agent/api/v1/Voter/${id}/`);
  }

  updateVoter(data, id) {
    return http.patch(`/campaign_agent/api/v1/Voter/${id}/`, data);
  }
  deleteVoter(id) {
    return http.delete(`/campaign_agent/api/v1/Voter/${id}/`);
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
    return http.get(`/campaign_zone/api/v1/Vidhansabha/${id}/`);
  }
  getVidhansabhas() {
    return http.get("/campaign_zone/api/v1/Vidhansabha/");
  }
  // Loksabha
  getLoksabha(id) {
    return http.get(`/campaign_zone/api/v1/Loksabha/${id}/`);
  }
  getLoksabhas() {
    return http.get("/campaign_zone/api/v1/Loksabha/");
  }
  // Mandals
  getMandalDashboard() {
    return http.get("/campaign_zone/api/v1/Mandal/");
  }
  getMandal(id) {
    return http.get(`/campaign_zone/api/v1/Mandal/${id}/`);
  }
  getMandals() {
    return http.get("/campaign_zone/api/v1/Mandal/");
  }

  // Sectors
  getSector(id) {
    return http.get(`/campaign_zone/api/v1/Sector/${id}/`);
  }
  getSectors() {
    return http.get("/campaign_zone/api/v1/Sector/");
  }

  // PollingBooth
  getBooth(id) {
    return http.get(`/campaign_zone/api/v1/PollingBooth/${id}/`);
  }
  getBooths() {
    return http.get("/campaign_zone/api/v1/PollingBooth/");
  }
}

export default new ApiService();
